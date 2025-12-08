import axios from './axiosInstance';

export const fetchGemelById = async (id) => {
  if (!id) throw new Error('ID נדרש');

  const res = await axios.get(`/datastore_search`, {
    params: {
      resource_id: 'a30dcbea-a1d2-482c-ae29-8f781f5025fb',
      q: id,
    },
  });

  const records = res.data.result?.records;
  if (!records || records.length === 0) {
    throw new Error('לא נמצאו תוצאות');
  }

  return records;
};
