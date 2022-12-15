export async function request(data) {
  const config = {
    method: "POST",
    url: "https://oc2efhjwph.execute-api.eu-central-1.amazonaws.com/prod/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Request-Method": "POST",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      "https://oc2efhjwph.execute-api.eu-central-1.amazonaws.com/prod/",
      config
    );
    return await response.json();
  } catch (error) {
    return {
      ok: false,
      error: error,
    };
  }
}
