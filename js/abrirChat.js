window.addEventListener('load', function () {
    // 1. Seleciona todos os seus botões personalizados
    const customChatButtons = document.querySelectorAll('.js-open-chat');

    // 2. Adiciona o evento de clique a cada um deles
    customChatButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Impede que o link navegue para '#'

            // 3. Tenta encontrar a bolha do chat pelo ID que você forneceu
            const chatBubble = document.getElementById('chatbot-fab');

            // 4. Se a bolha for encontrada, simula um clique nela
            if (chatBubble) {
                chatBubble.click();
            } else {
                console.error('Elemento do chat com id="chatbot-fab" não foi encontrado. Verifique se o ID está correto ou se o widget foi carregado.');
            }
        });
    });
});