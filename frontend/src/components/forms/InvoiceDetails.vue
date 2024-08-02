<template>
  <div v-if="invoice">
    <div ref="printSection" class="invoice-details">
      <h1>Invoice Details</h1>
      <p><strong>Invoice ID:</strong> {{ invoice.invoiceId }}</p>
      <p><strong>Payment Method:</strong> {{ invoice.paymentMethod }}</p>
      <p><strong>Status:</strong> {{ invoice.status }}</p>
      <p><strong>Created At:</strong> {{ new Date(invoice.timestamp).toLocaleString() }}</p>
    </div>
    <button @click="goBack">Back to invoices</button>
    <button @click="downloadPdf">Download as PDF</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import api from '@/services/api';
import html2pdf from 'html2pdf.js';

export default {
  data() {
    return {
      invoice: null, // Corrected from invoices to invoice
    };
  },
  created() {
    this.fetchInvoiceDetails();
  },
  methods: {
    async fetchInvoiceDetails() {
      try {
        const invoiceId = this.$route.params.invoiceId;
        const response = await api.getInvoice(invoiceId);
        this.invoice = response.data;
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    },
    downloadPdf() {
      const element = this.$refs.printSection;
      html2pdf(element);
    },
    goBack() {
      this.$router.push({ name: 'invoiceList' });
    }
  },
};
</script>

<style scoped>
.invoice-details {
  padding: 20px;
}
</style>
