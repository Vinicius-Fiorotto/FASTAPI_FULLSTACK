const API_URL = "http://127.0.0.1:8000";

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    if (response.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = "login.html";
    }
    
    return response;
}

const OrderAPI = {
    listar: () => fetchWithAuth('/orders/listar/pedidos-usuario'),
    criar: (dados) => fetchWithAuth('/orders/', {
        method: 'POST',
        body: JSON.stringify(dados)
    }),
    listar_itens: (id) => fetchWithAuth(`/orders/pedido/${id}`),
    excluir_item: (id) => fetchWithAuth(`/orders/pedido/remover-item/${id}`, {
        method: 'POST'
    }),
    novo_pedido: () => fetchWithAuth('/orders/pedido', {
        method: 'POST',
    }),
    excluir_pedido: (id) => fetchWithAuth(`/orders/pedido/excluir/${id}`, {
        method: 'POST'
    }),
    incluir_item: (id, dados) => fetchWithAuth(`/orders/pedido/adicionar-item/${id}`, {
        method: 'POST',
        body: JSON.stringify(dados)
    }),
};