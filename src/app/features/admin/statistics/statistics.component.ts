import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SalesData {
  id: number;
  category: string;
  initialStock: number;
  firstMonthSales: number;
  secondMonthSales: number;
  stockOutTime?: number;
  growthRate?: number;
  priority?: number;
}

interface CategorySalesData {
  category: string;
  sales: number;
  initialStock: number;
  stockOutTime: number;
  color: string;
  percentage: number;
  priority: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StatisticsComponent implements OnInit {
  // Agregamos Math para poder usarlo en la plantilla
  Math = Math;
  
  // Datos basados en la tabla proporcionada
  salesData: SalesData[] = [
    { id: 1, category: 'Blusas', initialStock: 120, firstMonthSales: 36, secondMonthSales: 45 },
    { id: 2, category: 'Pantalones', initialStock: 80, firstMonthSales: 28, secondMonthSales: 30 },
    { id: 3, category: 'Accesorios', initialStock: 150, firstMonthSales: 25, secondMonthSales: 40 },
    { id: 4, category: 'Calzado', initialStock: 100, firstMonthSales: 20, secondMonthSales: 35 }
  ];

  // Filtros
  selectedCategory: string = 'all';
  selectedPeriod: string = '2';

  // Métricas calculadas
  totalInitialStock: number = 0;
  totalSales: number = 0;
  priorityCategories: SalesData[] = [];
  predictedStockOut: string = '';
  topCategory: string = '';
  topCategoryGrowth: number = 0;
  growthRate: number = 0;
  
  // Datos para visualizaciones
  categorySalesData: CategorySalesData[] = [];
  
  // Colores para categorías
  categoryColors: {[key: string]: string} = {
    'Blusas': 'bg-pink-500',
    'Pantalones': 'bg-blue-500',
    'Accesorios': 'bg-purple-500',
    'Calzado': 'bg-yellow-500'
  };

  constructor() {}

  ngOnInit() {
    this.calculateMetrics();
    this.prepareCategorySalesData();
  }

  calculateMetrics() {
    this.totalInitialStock = this.salesData.reduce((sum, item) => sum + item.initialStock, 0);
    this.totalSales = this.salesData.reduce((sum, item) => 
      sum + item.firstMonthSales + item.secondMonthSales, 0);

    // Calcular tasa de crecimiento para cada categoría
    this.salesData.forEach(item => {
      // Calculamos la tasa de crecimiento (puede ser positiva o negativa)
      item.growthRate = this.calculateGrowthRate(item.firstMonthSales, item.secondMonthSales);
      
      // Calculamos el tiempo de agotamiento basado en la tendencia de ventas
      if (item.growthRate !== 0) {
        // Si hay crecimiento o decrecimiento, usamos la fórmula exponencial
        // Proyectamos las ventas futuras y calculamos cuándo el stock acumulado superará el stock inicial
        let remainingStock = item.initialStock - item.firstMonthSales - item.secondMonthSales;
        let month = 2; // Empezamos desde el mes 2 (ya tenemos datos)
        let monthlySales = item.secondMonthSales;
        
        while (remainingStock > 0 && month < 24) { // Limitamos a 24 meses para evitar bucles infinitos
          month++;
          // Calculamos las ventas del siguiente mes usando la tasa de crecimiento
          monthlySales = monthlySales * (1 + item.growthRate / 100);
          remainingStock -= monthlySales;
        }
        
        // El tiempo de agotamiento es el mes en que se agota menos el mes actual (2)
        item.stockOutTime = month - 2;
      } else {
        // Si no hay crecimiento, usamos el promedio de ventas
        const avgMonthlySales = (item.firstMonthSales + item.secondMonthSales) / 2;
        const remainingStock = item.initialStock - item.firstMonthSales - item.secondMonthSales;
        item.stockOutTime = remainingStock / avgMonthlySales;
      }
      
      // Asignamos prioridad basada en el tiempo de agotamiento (menor tiempo = mayor prioridad)
      item.priority = Math.round(10 / item.stockOutTime!); // Escala de 1-10
    });

    // Ordenamos las categorías por prioridad (tiempo de agotamiento)
    this.priorityCategories = [...this.salesData].sort((a, b) => a.stockOutTime! - b.stockOutTime!);
    
    // Encontrar la categoría que se agotará primero
    const fastestStockOut = this.priorityCategories[0];
    this.predictedStockOut = `${fastestStockOut.category} (${fastestStockOut.stockOutTime!.toFixed(1)} meses)`;

    // Encontrar la categoría con mayor tasa de crecimiento
    const topGrowthCategory = [...this.salesData].sort((a, b) => b.growthRate! - a.growthRate!)[0];
    this.topCategory = topGrowthCategory.category;
    this.topCategoryGrowth = topGrowthCategory.growthRate!;
    
    // Calcular tasa de crecimiento promedio
    this.growthRate = this.salesData.reduce((sum, item) => sum + item.growthRate!, 0) / this.salesData.length;
  }

  prepareCategorySalesData() {
    const totalSales = this.salesData.reduce((sum, item) => 
      sum + item.firstMonthSales + item.secondMonthSales, 0);

    this.categorySalesData = this.salesData.map(item => {
      const sales = item.firstMonthSales + item.secondMonthSales;
      return {
        category: item.category,
        sales: sales,
        initialStock: item.initialStock,
        stockOutTime: item.stockOutTime!,
        color: this.categoryColors[item.category] || 'bg-gray-500',
        percentage: Math.round((sales / totalSales) * 100),
        priority: item.priority!
      };
    }).sort((a, b) => b.priority - a.priority); // Ordenar por prioridad
  }

  getStockOutClass(time: number): string {
    if (time <= 2) return 'bg-red-100 text-red-800';
    if (time <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }

  getPriorityClass(priority: number): string {
    if (priority >= 7) return 'bg-red-100 text-red-800';
    if (priority >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }

  getProgressWidth(percentage: number): string {
    return `${percentage}%`;
  }

  calculateGrowthRate(firstMonth: number, secondMonth: number): number {
    return ((secondMonth - firstMonth) / firstMonth) * 100;
  }

  updateFilters() {
    // Actualizar datos basados en los filtros seleccionados
    this.calculateMetrics();
    this.prepareCategorySalesData();
  }
}