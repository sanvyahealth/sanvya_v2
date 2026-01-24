"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Archive,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  Package,
  Search,
  ShoppingCart,
  Trash2,
  TrendingDown,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { motion } from "framer-motion";

// --- Demo Data ---

const inventoryStats = [
  {
    title: "Total Items",
    value: "3,450",
    change: "+120 new items",
    changeType: "positive",
    icon: Package,
    iconColor: "bg-blue-500",
  },
  {
    title: "Low Stock Items",
    value: "45",
    change: "Restock needed",
    changeType: "negative",
    icon: AlertTriangle,
    iconColor: "bg-amber-500",
  },
  {
    title: "Expired Items",
    value: "12",
    change: "Action required",
    changeType: "negative",
    icon: Calendar,
    iconColor: "bg-red-500",
  },
  {
    title: "Total Stock Value",
    value: "₹85.2L",
    change: "+5% vs last month",
    changeType: "positive",
    icon: DollarSign,
    iconColor: "bg-green-500",
  },
] as const;

const categoryData = [
  { category: "Medicine", count: 1200, value: 4500000 },
  { category: "Surgical", count: 800, value: 2500000 },
  { category: "Equipment", count: 150, value: 850000 },
  { category: "Consumables", count: 950, value: 350000 },
  { category: "Lab", count: 350, value: 320000 },
];

const stockStatusData = [
  { name: "In Stock", value: 2800, fill: "#10b981" },
  { name: "Low Stock", value: 450, fill: "#f59e0b" },
  { name: "Out of Stock", value: 120, fill: "#ef4444" },
  { name: "Expired", value: 80, fill: "#64748b" },
];

const radarData = [
  { subject: "Stock Availability", A: 120, fullMark: 150 },
  { subject: "Value Efficiency", A: 98, fullMark: 150 },
  { subject: "Category Diversity", A: 86, fullMark: 150 },
  { subject: "Price Range", A: 99, fullMark: 150 },
  { subject: "Expiry Mgmt", A: 85, fullMark: 150 },
  { subject: "Low Stock Count", A: 65, fullMark: 150 },
];

const scatterData = [
  { price: 100, stock: 200, name: "Paracetamol" },
  { price: 1200, stock: 50, name: "Antibiotic Injection" },
  { price: 50, stock: 500, name: "Syringes" },
  { price: 5000, stock: 10, name: "Surgical Kit" },
  { price: 300, stock: 150, name: "Cough Syrup" },
  { price: 80, stock: 300, name: "Bandages" },
  { price: 1500, stock: 30, name: "Insulin" },
  { price: 2500, stock: 20, name: "Stethoscope" },
  { price: 10, stock: 1000, name: "Gloves" },
  { price: 450, stock: 80, name: "Vitamin Supplements" },
  { price: 200, stock: 120, name: "Painkillers" },
  { price: 3500, stock: 15, name: "BP Monitor" },
];

const fullInventoryData = [
  {
    id: "INV-001",
    name: "Paracetamol 500mg",
    category: "Medicine",
    price: 25,
    stock: 1200,
    reorderLevel: 500,
    batch: "B2023-01",
    expires: "2025-12-31",
    manufacturer: "PharmaCorp",
    status: "In Stock",
  },
  {
    id: "INV-002",
    name: "Surgical Mask (N95)",
    category: "Consumables",
    price: 45,
    stock: 45,
    reorderLevel: 100,
    batch: "SM-224",
    expires: "2026-05-20",
    manufacturer: "MediSafe",
    status: "Low Stock",
  },
  {
    id: "INV-003",
    name: "Amoxicillin 250mg",
    category: "Medicine",
    price: 85,
    stock: 0,
    reorderLevel: 200,
    batch: "AMX-88",
    expires: "2024-11-15",
    manufacturer: "HealthGen",
    status: "Out of Stock",
  },
  {
    id: "INV-004",
    name: "Sterile Gloves (L)",
    category: "Consumables",
    price: 15,
    stock: 5000,
    reorderLevel: 1000,
    batch: "GL-992",
    expires: "2023-10-01",
    manufacturer: "SafeHands",
    status: "Expired",
  },
  {
    id: "INV-005",
    name: "Insulin Glargine",
    category: "Medicine",
    price: 450,
    stock: 120,
    reorderLevel: 50,
    batch: "INS-004",
    expires: "2025-02-28",
    manufacturer: "BioLife",
    status: "In Stock",
  },
  {
    id: "INV-006",
    name: "Digital Thermometer",
    category: "Equipment",
    price: 850,
    stock: 35,
    reorderLevel: 20,
    batch: "DT-X1",
    expires: "N/A",
    manufacturer: "TechMed",
    status: "In Stock",
  },
];

// --- Animation ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = fullInventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const lowStockItems = fullInventoryData.filter(
    (item) => item.stock <= item.reorderLevel && item.status !== "Expired",
  );

  const expiredItems = fullInventoryData.filter(
    (item) => item.status === "Expired",
  );

  return (
    <div className="flex flex-col">
      <Header title="Inventory" />

      <main className="flex-1 p-6 space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="text-muted-foreground">
              Monitor stock levels, track expiration, and analyze inventory
              performance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inventoryStats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                />
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bar Chart: Inventory by Category */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Inventory by Category</CardTitle>
                  <CardDescription>
                    Item count and total value per category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                          dataKey="category"
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="count"
                          fill="#3b82f6"
                          name="Item Count"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="value"
                          fill="#10b981"
                          name="Value (₹)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Donut Chart: Stock Status Distribution */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Stock Status Distribution</CardTitle>
                  <CardDescription>
                    Current health of inventory items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stockStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {stockStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Radar Chart: Inventory Performance */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Inventory Performance</CardTitle>
                  <CardDescription>
                    Multidimensional analysis of inventory health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={radarData}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" fontSize={12} />
                        <PolarRadiusAxis />
                        <Radar
                          name="Performance"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Scatter Plot: Price vs Stock */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Price vs. Stock Levels</CardTitle>
                  <CardDescription>
                    Correlation between unit price and quantity available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          dataKey="price"
                          name="Price"
                          unit="₹"
                          fontSize={12}
                        />
                        <YAxis
                          type="number"
                          dataKey="stock"
                          name="Stock"
                          fontSize={12}
                        />
                        <ZAxis
                          type="number"
                          dataKey="price"
                          range={[60, 400]}
                        />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter
                          name="Items"
                          data={scatterData}
                          fill="#ef4444"
                          shape="circle"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tables Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle>Inventory Details</CardTitle>
                <CardDescription>
                  Manage full inventory, low stock, and expired items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="full" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-4">
                    <TabsTrigger value="full">Full Inventory</TabsTrigger>
                    <TabsTrigger value="low">Low Stock</TabsTrigger>
                    <TabsTrigger value="expired">Expired Items</TabsTrigger>
                  </TabsList>

                  {/* 1. Full Inventory */}
                  <TabsContent value="full" className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, code, category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                      />
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredInventory.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-mono text-xs">
                                {item.id}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {item.batch}
                              </TableCell>
                              <TableCell className="font-medium">
                                {item.name}
                              </TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>₹{item.price}</TableCell>
                              <TableCell>{item.stock}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={
                                    item.status === "In Stock"
                                      ? "bg-green-100 text-green-700"
                                      : item.status === "Low Stock"
                                        ? "bg-amber-100 text-amber-700"
                                        : item.status === "Out of Stock"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-slate-700"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <ArrowRightLeft className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* 2. Low Stock Alerts */}
                  <TabsContent value="low">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Current Qty</TableHead>
                            <TableHead>Reorder Level</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {lowStockItems.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="text-center h-24"
                              >
                                No items running low on stock.
                              </TableCell>
                            </TableRow>
                          ) : (
                            lowStockItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs">
                                  {item.id}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="text-red-600 font-bold">
                                  {item.stock}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {item.reorderLevel}
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="default">
                                    <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                                    Restock
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* 3. Expired Items */}
                  <TabsContent value="expired">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead>Expired On</TableHead>
                            <TableHead>Stock Qty</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {expiredItems.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={7}
                                className="text-center h-24"
                              >
                                No expired items found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            expiredItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs">
                                  {item.id}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.batch}</TableCell>
                                <TableCell className="text-red-500 font-medium">
                                  {item.expires}
                                </TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="gap-2"
                                  >
                                    <Trash2 className="h-4 w-4" /> Discard
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
