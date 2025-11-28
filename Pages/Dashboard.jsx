import React, { useState, useEffect } from "react";
import { ContentCheck } from "@/entities/ContentCheck";
import { Shield, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StatsCard from "@/Components/Dashboard/StatsCard";
import RecentCheckCard from "@/Components/Dashboard/RecentCheckCard";
import VerificationTrendsChart from "@/Components/Dashboard/VerificationTrendsChart";
import VerdictDistributionChart from "@/Components/Dashboard/VerdictDistributionChart";
import TopicsChart from "@/Components/Dashboard/TopicsChart";
import TrendingAlertsCard from "@/Components/Dashboard/TrendingAlertsCard";
import GamificationDashboard from "@/Components/Gamification/GamificationDashboard";

export default function DashboardPage() {
  const [checks, setChecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    loadChecks();
  }, []);

  const loadChecks = async () => {
    setIsLoading(true);
    const data = await ContentCheck.list("-created_date", 50);
    setChecks(data);
    setIsLoading(false);
  };

  const calculateStats = () => {
    const totalChecks = checks.length;
    const verifiedCount = checks.filter(c => c.verdict === "verified").length;
    const falseCount = checks.filter(c => c.verdict === "false").length;
    const trendingCount = checks.filter(c => c.is_trending).length;

    return { totalChecks, verifiedCount, falseCount, trendingCount };
  };

  const stats = calculateStats();

  const filteredChecks = checks.filter(check => {
    const checkDate = new Date(check.created_date);
    const now = new Date();
    
    switch(timeFilter) {
      case "today":
        return checkDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return checkDate >= weekAgo;
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return checkDate >= monthAgo;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Dashboard</h1>
          <p className="text-lg text-slate-600">
            Monitor your verification activity and track your progress
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gamification">Achievements & Points</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Checks"
                value={stats.totalChecks}
                icon={Shield}
                gradient="from-blue-500 to-blue-600"
                delay={0}
              />
              <StatsCard
                title="Verified True"
                value={stats.verifiedCount}
                icon={CheckCircle2}
                gradient="from-emerald-500 to-emerald-600"
                delay={0.1}
              />
              <StatsCard
                title="False Content"
                value={stats.falseCount}
                icon={XCircle}
                gradient="from-red-500 to-red-600"
                delay={0.2}
              />
              <StatsCard
                title="Trending Alerts"
                value={stats.trendingCount}
                icon={TrendingUp}
                gradient="from-amber-500 to-amber-600"
                delay={0.3}
              />
            </div>

            {/* Data Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VerificationTrendsChart />
              <VerdictDistributionChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TopicsChart />
              </div>
              <TrendingAlertsCard />
            </div>

            {/* Recent Checks */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Recent Verifications</h2>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                  ))}
                </div>
              ) : filteredChecks.length === 0 ? (
                <div className="text-center py-20">
                  <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No verifications {timeFilter !== "all" ? `for ${timeFilter}` : "yet"}
                  </h3>
                  <p className="text-slate-600">Start by verifying your first piece of content</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredChecks.slice(0, 10).map((check, index) => (
                    <RecentCheckCard key={check.id} check={check} index={index} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gamification">
            <GamificationDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
