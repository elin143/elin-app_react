import { useState } from "react";
import PageHeader from "../components/PageHeader";

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function CustomerSegmen() {
    const [filter, setFilter] = useState("all");

    const data = [
    {
        id: 1,
        name: "Eom Seonghyeon",
        segment: "VIP Customer",
        visit: 15,
        lastVisit: "2026-05-28",
        status: "Active",
    },
    {
        id: 2,
        name: "Andi Saputra",
        segment: "New Customer",
        visit: 1,
        lastVisit: "2026-06-01",
        status: "Active",
    },
    {
        id: 3,
        name: "Jessica Tan",
        segment: "Active Customer",
        visit: 8,
        lastVisit: "2026-05-30",
        status: "Active",
    },
    {
        id: 4,
        name: "Michael Lim",
        segment: "Inactive Customer",
        visit: 3,
        lastVisit: "2025-12-15",
        status: "Inactive",
    },
    {
        id: 5,
        name: "Olivia Chen",
        segment: "VIP Customer",
        visit: 21,
        lastVisit: "2026-06-02",
        status: "Active",
    },
    {
        id: 6,
        name: "Kevin Lestari",
        segment: "VIP Customer",
        visit: 35,
        lastVisit: "2026-05-09",
        status: "Active",
    },
    {
        id: 7,
        name: "Santi Setiawan",
        segment: "New Customer",
        visit: 1,
        lastVisit: "2026-05-18",
        status: "Active",
    },
    {
        id: 8,
        name: "Amanda Malik",
        segment: "VIP Customer",
        visit: 30,
        lastVisit: "2026-05-14",
        status: "Active",
    },
    {
        id: 9,
        name: "Siti Santoso",
        segment: "VIP Customer",
        visit: 18,
        lastVisit: "2026-05-08",
        status: "Active",
    },
    {
        id: 10,
        name: "Tono Pramono",
        segment: "VIP Customer",
        visit: 29,
        lastVisit: "2026-05-07",
        status: "Active",
    },
    {
        id: 11,
        name: "David Limbong",
        segment: "Inactive Customer",
        visit: 2,
        lastVisit: "2025-08-19",
        status: "Inactive",
    },
    {
        id: 12,
        name: "Heri Sholeh",
        segment: "VIP Customer",
        visit: 17,
        lastVisit: "2026-05-23",
        status: "Active",
    },
    {
        id: 13,
        name: "Ani Gunawan",
        segment: "Active Customer",
        visit: 6,
        lastVisit: "2026-05-07",
        status: "Active",
    },
    {
        id: 14,
        name: "Rian Gunawan",
        segment: "VIP Customer",
        visit: 14,
        lastVisit: "2026-05-13",
        status: "Active",
    },
    {
        id: 15,
        name: "Dewi Purnama",
        segment: "Active Customer",
        visit: 8,
        lastVisit: "2026-05-26",
        status: "Active",
    },
    {
        id: 16,
        name: "Siti Malik",
        segment: "Inactive Customer",
        visit: 5,
        lastVisit: "2025-02-13",
        status: "Inactive",
    },
    {
        id: 17,
        name: "Agus Tanjung",
        segment: "Active Customer",
        visit: 9,
        lastVisit: "2026-05-19",
        status: "Active",
    },
    {
        id: 18,
        name: "Rudi Ginting",
        segment: "VIP Customer",
        visit: 13,
        lastVisit: "2026-05-22",
        status: "Active",
    },
    {
        id: 19,
        name: "Santi Kurniawan",
        segment: "Active Customer",
        visit: 5,
        lastVisit: "2026-05-28",
        status: "Active",
    },
    {
        id: 20,
        name: "Santi Fadilah",
        segment: "VIP Customer",
        visit: 24,
        lastVisit: "2026-05-09",
        status: "Active",
    },
    {
        id: 21,
        name: "Joko Limbong",
        segment: "Active Customer",
        visit: 6,
        lastVisit: "2026-05-12",
        status: "Active",
    },
    {
        id: 22,
        name: "Yanti Kusuma",
        segment: "Active Customer",
        visit: 5,
        lastVisit: "2026-05-20",
        status: "Active",
    },
    {
        id: 23,
        name: "Kevin Pratama",
        segment: "New Customer",
        visit: 1,
        lastVisit: "2026-05-20",
        status: "Active",
    },
    {
        id: 24,
        name: "Joko Subagyo",
        segment: "Active Customer",
        visit: 7,
        lastVisit: "2026-05-22",
        status: "Active",
    },
    {
        id: 25,
        name: "Dedi Basri",
        segment: "VIP Customer",
        visit: 19,
        lastVisit: "2026-05-27",
        status: "Active",
    },
    {
        id: 26,
        name: "Siti Sholeh",
        segment: "Active Customer",
        visit: 10,
        lastVisit: "2026-05-09",
        status: "Active",
    },
    {
        id: 27,
        name: "Agus Kusuma",
        segment: "Active Customer",
        visit: 7,
        lastVisit: "2026-05-21",
        status: "Active",
    },
    {
        id: 28,
        name: "Sri Subagyo",
        segment: "Inactive Customer",
        visit: 2,
        lastVisit: "2025-05-05",
        status: "Inactive",
    },
    {
        id: 29,
        name: "Rani Setiawati",
        segment: "Active Customer",
        visit: 10,
        lastVisit: "2026-05-29",
        status: "Active",
    },
    {
        id: 30,
        name: "Andi Subagyo",
        segment: "Active Customer",
        visit: 7,
        lastVisit: "2026-05-05",
        status: "Active",
    },
];

    const filteredData =
        filter === "all"
            ? data
            : data.filter((item) =>
                  item.segment.toLowerCase().includes(filter)
              );

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="bg-gradient-to-br from-white via-pink-50 to-rose-50 p-8 rounded-[2.5rem] border-4 border-pink-100 shadow-md">
                <PageHeader
                    title={
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-pink-400 tracking-tight font-serif italic">
                                Customer Segmentation
                            </h1>
                            <div className="h-1.5 w-16 bg-gradient-to-r from-pink-200 to-rose-300 rounded-full" />
                        </div>
                    }
                    breadcrumb={["Home", "Customer Segmentation"]}
                />
            </div>

            {/* FILTER SECTION */}
            <div className="bg-white p-6 rounded-[2rem] border border-pink-100 shadow-sm">
                <div className="flex items-center justify-between">

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-pink-100 rounded-2xl">

                            <TabsTrigger value="all" onClick={() => setFilter("all")}>
                                All
                            </TabsTrigger>

                            <TabsTrigger value="new" onClick={() => setFilter("new")}>
                                New
                            </TabsTrigger>

                            <TabsTrigger value="active" onClick={() => setFilter("active")}>
                                Active
                            </TabsTrigger>

                            <TabsTrigger value="vip" onClick={() => setFilter("vip")}>
                                VIP
                            </TabsTrigger>

                            <TabsTrigger value="inactive" onClick={() => setFilter("inactive")}>
                                Inactive
                            </TabsTrigger>

                        </TabsList>
                    </Tabs>

                    {/* Select */}
                    <Select onValueChange={(value) => setFilter(value)}>
                        <SelectTrigger className="w-[220px] border-pink-200 rounded-2xl">
                            <SelectValue placeholder="Filter Segment" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Customer</SelectItem>
                            <SelectItem value="new">New Customer</SelectItem>
                            <SelectItem value="active">Active Customer</SelectItem>
                            <SelectItem value="vip">VIP Customer</SelectItem>
                            <SelectItem value="inactive">Inactive Customer</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white/70 shadow-sm">

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-pink-100 to-rose-100">
                            <TableHead>Name</TableHead>
                            <TableHead>Segment</TableHead>
                            <TableHead>Visit</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.id} className="hover:bg-pink-50">

                                <TableCell className="font-bold text-gray-700">
                                    {item.name}
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.segment === "VIP Customer"
                                                ? "bg-purple-100 text-purple-400"
                                                : item.segment === "Active Customer"
                                                ? "bg-emerald-100 text-emerald-400"
                                                : item.segment === "Inactive Customer"
                                                ? "bg-rose-100 text-rose-400"
                                                : "bg-pink-100 text-pink-400"
                                        }`}
                                    >
                                        {item.segment}
                                    </span>
                                </TableCell>

                                <TableCell>{item.visit}</TableCell>
                                <TableCell>{item.lastVisit}</TableCell>

                                <TableCell>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.status === "Active"
                                                ? "bg-green-100 text-green-500"
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    );
}