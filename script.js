// Alterna menu mobile
function toggleMenu() {
  const menu = document.getElementById("menuMobile");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Filtrar produtos por categoria (mobile + desktop)
function filtrarCategoria() {
  const filtros = document.querySelectorAll("#filtro-categoria");
  let filtroSelecionado = "todos";

  filtros.forEach(select => {
    if (select.value !== "todos") {
      filtroSelecionado = select.value.toLowerCase(); // garantir minúsculo
    }
  });

  const produtos = document.querySelectorAll(".product");
  produtos.forEach(produto => {
    const categoria = produto.getAttribute("data-categoria").toLowerCase();
    produto.style.display = (filtroSelecionado === "todos" || categoria === filtroSelecionado) ? "flex" : "none";
  });
}

// Resetar filtro
function resetarFiltro() {
  const filtros = document.querySelectorAll("#filtro-categoria");
  filtros.forEach(select => select.value = "todos");
  filtrarCategoria();
}

// Carrinho em memória
let carrinho = JSON.parse(localStorage.getItem("carrinhoChefBurger")) || [];

// Sugestões IA
const sugestoesChef = {
  "Abacate Cheeseburger": "🥑 Combine com molho de alho suave.",
  "Abacaxi Burger": "🍍 Experimente com batata frita crocante.",
  "Ankara Burger": "🇹🇷 Sirva com molho picante turco.",
  "Atum Burger": "🐟 Acompanhe com salada fresca.",
  "Big Burger": "🍔 Ideal com refrigerante gelado.",
  "Carne Grelhada": "🥩 Combine com legumes salteados.",
  "Chef Burger": "🍔 O Chef Huseyin indica molho barbecue especial.",
  "Cogumelo Cheeseburger": "🍄 Sirva com queijo extra derretido.",
  "Torrada Mista": "🥪 Acompanhe com café ou chá.",
  "Kafta": "🥙 Sirva com molho de iogurte e hortelã fresca."
};

// Adicionar item ao carrinho com sugestão e feedback visual
function adicionarItem(id, nome, preco, sugestaoId) {
  carrinho.push({ id, nome, preco });
  atualizarTotal();

  // Guardar no LocalStorage
  localStorage.setItem("carrinhoChefBurger", JSON.stringify(carrinho));

  const sugestao = document.getElementById(sugestaoId);
  const botao = event.target;

  if (sugestao) {
    sugestao.style.display = "block";
    sugestao.innerText = sugestoesChef[nome] || 
      `🍴 O Chef Huseyin recomenda um acompanhamento premium para ${nome}.`;
  }

  botao.innerText = "✅ Adicionado ao carrinho";
  botao.classList.add("clicked");

  setTimeout(() => {
    botao.innerText = "Adicionar";
    botao.classList.remove("clicked");
    if (sugestao) sugestao.style.display = "none";
  }, 3000);
}

// Atualizar total do carrinho
function atualizarTotal() {
  let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const totalElement = document.getElementById("totalCarrinho");
  if (totalElement) {
    totalElement.innerText = `Total: ${formatarPreco(total)} KZ`;
  }
}

// Função utilitária para formatar preço em KZ
function formatarPreco(valor) {
  return valor.toLocaleString("pt-AO", { minimumFractionDigits: 2 });
}

// Remover item do carrinho
function removerItem(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarTotal();
  localStorage.setItem("carrinhoChefBurger", JSON.stringify(carrinho));
}

// Abrir carrinho (botão flutuante mobile)
function abrirCarrinho() {
  window.location.href = "encomendas.html";
}