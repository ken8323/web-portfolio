// fetch APIでデータを取得する（Node.js 18+はfetch組み込み）
const fetchUser = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const main = async () => {
  try {
    // 1件取得
    const user = await fetchUser(1);
    console.log('User name:', user.name);
    console.log('User email:', user.email);

    // 複数件を並行取得（Pythonのasyncio.gather相当）
    const [user2, user3] = await Promise.all([fetchUser(2), fetchUser(3)]);
    console.log('Parallel:', user2.name, '/', user3.name);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
