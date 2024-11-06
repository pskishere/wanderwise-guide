import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export * from './addressParser';
export * from './addressData';

export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return format(d, 'yyyy-MM-dd', { locale: zhCN });
};

export const formatRelativeTime = (date: string | Date) => {
  const d = new Date(date);
  return formatDistanceToNow(d, { locale: zhCN, addSuffix: true });
};

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const generateImageUrl = (url: string, width: number, height?: number) => {
  if (!url) return '';
  if (url.startsWith('http')) {
    return `${url}?w=${width}${height ? `&h=${height}` : ''}`;
  }
  return url;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(price);
};