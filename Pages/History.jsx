 import React, { useState, useEffect } from "react";
import { ContentCheck } from "@/EntitiesRuntime/ContentCheck";
import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { History as HistoryIcon, Search } from "lucide-react";

import RecentCheckCard from "@/Components/Dashboard/RecentCheckCard";

export default function HistoryPage() {
  const [checks, setChecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [verdictFilter, setVerdictFilter] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    const data = await ContentCheck.list("-created_date", 100);
    setChecks(data);
    setIsLoading(false);
  };

  const filteredChecks = checks.filter(check => {
    const matchesSearch = !searchQuery || 
      check.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.url?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlatform = platformFilter === "all" || check.platform === platformFilter;
    const matchesVerdict = verdictFilter === "all" || check.verdict === verdictFilter;

    return matchesSearch && matchesPlatform && matchesVerdict;
  });

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <HistoryIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Verification History</h1>
              <p className="text-lg text-slate-600">
                Browse all your past content verifications
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by title or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-slate-200"
            />
          </div>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={verdictFilter} onValueChange={setVerdictFilter}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="All Verdicts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verdicts</SelectItem>
              <SelectItem value="verified">Verified True</SelectItem>
              <SelectItem value="misleading">Misleading</SelectItem>
              <SelectItem value="false">False</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600 font-medium">
            Showing {filteredChecks.length} of {checks.length} verifications
          </p>
        </div>

        {/* History List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array(10).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredChecks.length === 0 ? (
          <div className="text-center py-20">
            <HistoryIcon className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {searchQuery || platformFilter !== "all" || verdictFilter !== "all"
                ? "No matches found"
                : "No verification history"}
            </h3>
            <p className="text-lg text-slate-600">
              {searchQuery || platformFilter !== "all" || verdictFilter !== "all"
                ? "Try adjusting your filters"
                : "Start verifying content to build your history"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChecks.map((check, index) => (
              <RecentCheckCard key={check.id} check={check} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
