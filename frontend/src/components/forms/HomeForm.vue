<template>
    <div class="home-page">
      <div class="summary-container">
        <div class="summary-section orders">
          <h2>Orders</h2>
          <p>Total Orders: {{ summary.orders.total }}</p>
          <p>Pending Orders: {{ summary.orders.pending }}</p>
          <p>Completed Orders: {{ summary.orders.completed }}</p>
        </div>
        <div class="summary-section invoices">
          <h2>Invoices</h2>
          <p>Total Invoices: {{ summary.invoices.total }}</p>
          <p>Pending Invoices: {{ summary.invoices.pending }}</p>
          <p>Completed Invoices: {{ summary.invoices.completed }}</p>
        </div>
        <div class="summary-section waste-prices">
          <h2>Waste Prices</h2>
          <ul>
            <li v-for="waste in summary.wastePrices" :key="waste.name">
              {{ waste.name }} - Public: {{ waste.pricePublic }}, Internal: {{ waste.priceInternal }}, Wholesale: {{ waste.priceWholesale }}
            </li>
          </ul>
        </div>
        <div class="summary-section weight">
          <h2>Total Weight Processed</h2>
          <p>{{ summary.totalWeightProcessed }} kg</p>
        </div>
        <div class="summary-section revenue">
          <h2>Revenue Generated</h2>
          <p>{{ summary.revenueGenerated }}</p>
        </div>
        <div class="summary-section top-waste">
          <h2>Top Waste Types</h2>
          <ul>
            <li v-for="type in summary.topWasteTypes" :key="type">{{ type }}</li>
          </ul>
        </div>
        <div class="summary-section activities">
          <h2>Recent Activities</h2>
          <ul>
            <li v-for="activity in summary.recentActivities" :key="activity.timestamp">
              {{ activity.activity }} at {{ new Date(activity.timestamp).toLocaleString() }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'HomePage',
    data() {
      return {
        summary: {
          orders: {
            total: 0,
            pending: 0,
            completed: 0
          },
          invoices: {
            total: 0,
            pending: 0,
            completed: 0
          },
          wastePrices: [],
          totalWeightProcessed: 0,
          revenueGenerated: 0,
          topWasteTypes: [],
          recentActivities: []
        }
      };
    },
    created() {
      this.fetchSummary();
    },
    methods: {
      async fetchSummary() {
        try {
          const response = await api.getSummary();
          this.summary = response.data;
        } catch (error) {
          console.error('Error fetching summary data:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .home-page {
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .summary-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .summary-section {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .summary-section h2 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .summary-section p,
  .summary-section ul {
    margin: 0;
    color: #555;
  }
  
  .summary-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .summary-section ul li {
    margin-bottom: 5px;
  }
  
  .orders {
    background-color: #e3f2fd;
  }
  
  .invoices {
    background-color: #fce4ec;
  }
  
  .waste-prices {
    background-color: #e8f5e9;
  }
  
  .weight {
    background-color: #fff3e0;
  }
  
  .revenue {
    background-color: #f1f8e9;
  }
  
  .top-waste {
    background-color: #ffebee;
  }
  
  .activities {
    background-color: #ede7f6;
  }
  </style>
  