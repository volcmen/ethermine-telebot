import fetch from 'node-fetch';

const ethWallet = 'Your etherium wallet';

const GetInfo = async () => {
  const res = await fetch(`https://api.ethermine.org/miner/${ethWallet}/currentStats`);
  const data = await res.json();
  if (data.status === 'OK') {
    return data.data;
  }
  return 'Error on server. Dev need to fix it 🔧';
};

export { GetInfo };
