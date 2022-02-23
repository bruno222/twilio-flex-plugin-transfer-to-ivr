export const request = async (url: string, body: any) => {
  const options = {
    method: 'POST',
    body: new URLSearchParams(body),
  };

  const resp = await fetch(url, options);
  return await resp.json();
};
