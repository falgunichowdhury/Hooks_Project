// import { useQuery } from '@tanstack/react-query';
// import axiosInstance from '../utils/axios';

// export const useMetaScraper = (url) => {
//   return useQuery({
//     queryKey: ['metaData', url],
//     queryFn: async () => {
//       const targetUrl = `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`;
//       const { data } = await axiosInstance.get(encodeURIComponent(targetUrl));
//       return data;
//     },
//     enabled: !!url,
//   });
// };
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useMetaScraper = (url) => {
  return useQuery({
    queryKey: ['meta', url],
    queryFn: async () => {
      const { data } = await axios.get(`https://your-api.com/meta?url=${encodeURIComponent(url)}`);
      return data;
    },
    enabled: !!url,
  });
};