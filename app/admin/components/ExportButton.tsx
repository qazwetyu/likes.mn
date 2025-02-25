"use client";

interface ExportButtonProps {
  data: any[];
  type: 'csv' | 'excel' | 'pdf';
}

export default function ExportButton({ data, type }: ExportButtonProps) {
  const handleExport = () => {
    switch (type) {
      case 'csv':
        exportCSV(data);
        break;
      case 'excel':
        exportExcel(data);
        break;
      case 'pdf':
        exportPDF(data);
        break;
    }
  };

  const exportCSV = (data: any[]) => {
    const csv = [
      ['ID', 'Үйлчилгээ', 'Хэрэглэгч', 'Тоо', 'Үнэ', 'Төлөв', 'Огноо'],
      ...data.map(order => [
        order.id,
        order.service === 'followers' ? 'Дагагч' : 'Лайк',
        order.username,
        order.amount,
        order.price,
        order.status,
        new Date(order.createdAt).toLocaleString('mn-MN')
      ])
    ].map(row => row.join(',')).join('\n');

    downloadFile(csv, 'orders.csv', 'text/csv');
  };

  const exportExcel = (data: any[]) => {
    // Implement Excel export
  };

  const exportPDF = (data: any[]) => {
    // Implement PDF export
  };

  const downloadFile = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      Экспорт ({type.toUpperCase()})
    </button>
  );
} 