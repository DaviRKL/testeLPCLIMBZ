const modal = document.getElementById('privacy-modal');
const openModalLink = document.getElementById('open-modal-link');
const closeModalButton = modal.querySelector('.modal-close');

openModalLink.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.add('is-active');
});

closeModalButton.addEventListener('click', function () {
    modal.classList.remove('is-active');
});

// Fecha o modal se o usuário clicar fora do conteúdo
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.classList.remove('is-active');
    }
});


// --- LÓGICA DO FORMULÁRIO DE DIAGNÓSTICO ---
const form = document.getElementById('diag-form');
const statusDiv = document.getElementById('form-status');
const submitButton = document.getElementById('submit-button');
const privacyCheckbox = document.getElementById('privacy-check');

// Começa com o botão desabilitado
submitButton.disabled = true;

// Habilita/desabilita o botão com base no checkbox
privacyCheckbox.addEventListener('change', function () {
    submitButton.disabled = !this.checked;
});

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Verificação extra, caso o usuário consiga burlar o 'disabled'
    if (!privacyCheckbox.checked) {
        alert('Você precisa aceitar a Política de Privacidade para continuar.');
        return;
    }

    // Mostra feedback visual para o usuário
    submitButton.disabled = true;
    submitButton.innerText = 'Analisando com IA...';
    statusDiv.innerText = '';

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const aapsScriptUrl = 'https://script.google.com/macros/s/AKfycbwW-zJSJAbDOo6Ob0U_-5xjubWv6xJhuFSiocDNhdwxbP4vpajn4L-gqDzebhmeHCaTJg/exec'; // Seu URL

    fetch(aapsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                statusDiv.innerText = 'Diagnóstico enviado! Por favor, verifique seu e-mail.';
                statusDiv.style.color = 'green';
                form.reset();
            } else {
                throw new Error(result.error || 'Ocorreu um erro.');
            }
        })
        .catch(error => {
            statusDiv.innerText = 'Erro ao enviar. Tente novamente mais tarde.';
            statusDiv.style.color = 'red';
            console.error('Error:', error);
        })
        .finally(() => {
            // Restaura o botão para o estado inicial (desabilitado)
            submitButton.disabled = true;
            submitButton.innerText = 'Gerar meu Diagnóstico Gratuito';
        });
});
