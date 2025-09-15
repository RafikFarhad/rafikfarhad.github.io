<template>
  <NuxtLayout>
    <main class="container mx-auto px-4">
      <h1 class="text-2xl font-bold my-10 dark:text-white text-center">
        Route Matcher Tool
      </h1>
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Input IPs/CIDRs -->
        <div class="flex-1">
          <h2 class="text-lg font-semibold mb-2 dark:text-gray-200">
            Destination IPs or CIDRs (Input)
          </h2>
          <textarea
            v-model="inputCidrs"
            placeholder="Enter IPs or CIDRs (one per line)&#10;Example:&#10;192.168.1.1&#10;10.0.0.0/24"
            class="w-full h-80 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            @input="processComparison"
          ></textarea>
        </div>

        <!-- Target CIDRs -->
        <div class="flex-1">
          <h2 class="text-lg font-semibold mb-2 dark:text-gray-200">
            Route List (Target CIDRs)
          </h2>
          <textarea
            v-model="targetCidrs"
            placeholder="Enter target CIDR ranges (one per line)&#10;Example:&#10;192.168.0.0/16&#10;10.0.0.0/8"
            class="w-full h-80 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            @input="processComparison"
          ></textarea>
        </div>

        <!-- Results -->
        <div class="flex-1">
          <h2 class="text-lg font-semibold mb-2 dark:text-gray-200">
            Matching Networks/CIDRs
          </h2>
          <div
            class="w-full h-80 p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 overflow-auto"
          >
            <div
              v-if="processedResults.length === 0"
              class="text-gray-500 dark:text-gray-400"
            >
              Results will appear here
            </div>
            <div
              v-for="(result, index) in processedResults"
              :key="index"
              class="mb-4"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Input: {{ result.input }}
              </div>
              <div
                v-for="(match, matchIndex) in result.results"
                :key="matchIndex"
                class="mb-1"
              >
                <div class="relative group">
                  <code
                    class="block p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    {{ match.text }}
                  </code>
                  <div
                    class="absolute left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10 mt-1"
                  >
                    <div
                      class="p-2 bg-gray-800 text-white dark:bg-gray-600 text-xs rounded shadow-lg max-w-full overflow-hidden text-ellipsis"
                    >
                      Via: {{ match.targetLine }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
import ipaddr from "ipaddr.js";
import { useHead } from "#imports";

export default {
  name: "CidrToolPage",

  data() {
    return {
      inputCidrs: "",
      targetCidrs: "",
      results: "",
      processedResults: [],
    };
  },

  mounted() {
    // Add example values
    if (!this.inputCidrs) {
      this.inputCidrs = "192.168.1.1\n10.0.0.0/24";
    }
    if (!this.targetCidrs) {
      this.targetCidrs =
        "192.168.0.0/16\nBusiness network: 10.0.0.0/8\nLegacy subnet at 172.16.0.0/12";
    }
    this.processComparison();
  },

  methods: {
    // Process the comparison when either input changes
    processComparison() {
      if (!this.inputCidrs || !this.targetCidrs) {
        this.results = "";
        this.processedResults = [];
        return;
      }

      const inputLines = this.inputCidrs
        .split("\n")
        .filter((line) => line.trim());
      const targetLines = this.targetCidrs
        .split("\n")
        .filter((line) => line.trim());

      let resultText = "";
      const processedResults = [];

      for (const inputLine of inputLines) {
        if (!inputLine.trim()) continue;

        const cleanedInput = this.extractIPorCIDR(inputLine.trim());
        if (!cleanedInput) continue;

        const resultsForThisInput = [];

        // Extract all valid target CIDRs first while preserving order
        const validTargets = targetLines
          .map((line) => {
            const cidr = this.extractCIDR(line.trim());
            return cidr ? { original: line.trim(), cidr } : null;
          })
          .filter((item) => item !== null);

        // Check against each valid target in original order
        for (const target of validTargets) {
          try {
            const comparisonResult = this.compareIPorCIDR(
              cleanedInput,
              target.cidr,
            );
            if (comparisonResult) {
              resultText += comparisonResult + "\n";
              resultsForThisInput.push({
                text: comparisonResult,
                targetLine: target.original,
                extractedCIDR: target.cidr,
              });
            }
          } catch (error) {
            console.error(
              `Error comparing ${cleanedInput} with ${target.cidr}:`,
              error,
            );
          }
        }

        if (resultsForThisInput.length > 0) {
          processedResults.push({
            input: cleanedInput,
            originalInput: inputLine.trim(),
            results: resultsForThisInput,
          });
        }
      }

      this.results = resultText || "No matches found.";
      this.processedResults =
        processedResults.length > 0 ? processedResults : [];
    },

    // Compare an IP or CIDR with a target CIDR
    compareIPorCIDR(input: string, target: string): string | null {
      try {
        // Check if input is a single IP or a CIDR
        const isInputCIDR = input.includes("/");

        if (isInputCIDR) {
          // Input is a CIDR, check for overlap with target CIDR
          if (this.cidrOverlap(input, target)) {
            return `${input} has overlap with ${target}`;
          }
        } else {
          // Input is a single IP, check if it's inside the target CIDR
          if (this.isIPinCIDR(input, target)) {
            return `${input} is in ${target}`;
          }
        }

        return null; // No match
      } catch (error) {
        console.error("Comparison error:", error);
        return null;
      }
    },

    // Check if an IP is contained in a CIDR
    isIPinCIDR(ip: string, cidr: string): boolean {
      try {
        // Parse the IP address
        const addr = ipaddr.parse(ip);

        // Parse the CIDR range
        const cidrParts = cidr.split("/");
        const cidrAddr = ipaddr.parse(cidrParts[0]);
        // const cidrPrefix = parseInt(cidrParts[1], 10);

        // Create a range from the CIDR
        const cidrRange =
          cidrAddr.kind() === "ipv4"
            ? ipaddr.IPv4.parseCIDR(cidr)
            : ipaddr.IPv6.parseCIDR(cidr);

        // Check if the IP is in the CIDR range
        return addr.match(cidrRange);
      } catch (error) {
        console.error("IP in CIDR check error:", error);
        return false;
      }
    },

    // Check if two CIDR ranges overlap
    cidrOverlap(cidr1: string, cidr2: string): boolean {
      try {
        // Parse the first CIDR
        const cidr1Parts = cidr1.split("/");
        const cidr1Addr = ipaddr.parse(cidr1Parts[0]);
        // const cidr1Prefix = parseInt(cidr1Parts[1], 10);

        // Parse the second CIDR
        const cidr2Parts = cidr2.split("/");
        const cidr2Addr = ipaddr.parse(cidr2Parts[0]);
        // const cidr2Prefix = parseInt(cidr2Parts[1], 10);

        // Check for different IP versions
        if (cidr1Addr.kind() !== cidr2Addr.kind()) {
          return false;
        }

        // Convert to ranges
        let cidr1Range: any, cidr2Range: any;

        if (cidr1Addr.kind() === "ipv4") {
          cidr1Range = ipaddr.IPv4.parseCIDR(cidr1);
          cidr2Range = ipaddr.IPv4.parseCIDR(cidr2);
        } else {
          cidr1Range = ipaddr.IPv6.parseCIDR(cidr1);
          cidr2Range = ipaddr.IPv6.parseCIDR(cidr2);
        }

        // Check if either network contains the other's start address
        const cidr1Start = cidr1Range[0];
        const cidr2Start = cidr2Range[0];

        return cidr1Start.match(cidr2Range) || cidr2Start.match(cidr1Range);
      } catch (error) {
        console.error("CIDR overlap check error:", error);
        return false;
      }
    },

    // Extract IP address or CIDR from a string
    extractIPorCIDR(text) {
      // Match IPv4 or IPv6 address, with or without CIDR notation
      const ipv4Pattern =
        /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:3[0-2]|[1-2][0-9]|[0-9]))?\b/;
      const ipv6Pattern =
        /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(?:\/(?:12[0-8]|1[0-1][0-9]|[1-9][0-9]|[0-9]))?\b/;

      // Try to match IPv4 first, then IPv6
      const ipv4Match = text.match(ipv4Pattern);
      if (ipv4Match) return ipv4Match[0];

      const ipv6Match = text.match(ipv6Pattern);
      if (ipv6Match) return ipv6Match[0];

      return null;
    },

    // Extract CIDR specifically (must have prefix)
    extractCIDR(text) {
      // Match IPv4 or IPv6 CIDR notation
      const ipv4CIDRPattern =
        /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:3[0-2]|[1-2][0-9]|[0-9])\b/;
      const ipv6CIDRPattern =
        /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\/(?:12[0-8]|1[0-1][0-9]|[1-9][0-9]|[0-9])\b/;

      // Try to match IPv4 CIDR first, then IPv6 CIDR
      const ipv4Match = text.match(ipv4CIDRPattern);
      if (ipv4Match) return ipv4Match[0];

      const ipv6Match = text.match(ipv6CIDRPattern);
      if (ipv6Match) return ipv6Match[0];

      return null;
    },
  },
};
</script>

<style>
code {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}
</style>
