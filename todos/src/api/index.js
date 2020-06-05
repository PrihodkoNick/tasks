export default class TodosService {
  _baseUrl = "http://localhost:5000";

  getResource = async (url, options) => {
    const res = await fetch(`${this._baseUrl}${url}`, options);

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._baseUrl}${url}` + `, received ${res.status}`
      );
    }

    return await res;
  };

  getTodos = async () => {
    const res = await this.getResource("", { method: "GET" }).then((data) =>
      data.json()
    );

    return res;
  };

  addTodos = async (todo) => {
    const params = {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };

    const res = await fetch("http://localhost:5000", params);

    return res;
  };
}
