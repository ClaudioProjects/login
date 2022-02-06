class ValidaForm {
    constructor() {
        this.formulario = document.querySelector('.form')
        this.eventos();
    }
    
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const isValidC = this.isValid();
        const validaSenha = this.validPassword();
        if(isValidC && validaSenha) {
            alert('Formulario enviado')
            this.formulario.submit()
        }
    };

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div)
    }

    isValid(){
         for (let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove()
        }
        let valid = true;
        for (let campos of this.formulario.querySelectorAll('.check')) {
            const label = campos.placeholder;
            if(!campos.value) {
                this.criaErro(campos, `O campo "${label.toUpperCase()}" não pode conter espaços vazios`);
                valid = false;
            }
            if (campos.classList.contains('inputCpf')) {
                if (!this.validaCpf(campos)) valid = false
            }

            if (campos.classList.contains('checkWord')){
                if (!this.checkWord(campos, label)) valid = false
            }

            if (campos.classList.contains('checkUser')){
                if (!this.checkUser(campos)) valid = false
            }
        }
        return valid

    }
    validaCpf(campo) {
        const cpf = new ValidaCpf(campo.value)

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF invalido');
            return false;
        }

        return true;
    }

    checkWord(campo, label) {
        if (!(campo.value.length <= 13 || campo.value.length >= 6)) {
            this.criaErro(campo, `"${label}" precisa ter entre 6 e 13 caracteres`)
            return false
        }

        return true
    }

    checkUser(campo) {
        const user = campo.value
        if (!user.match(/^[a-zA-Z0-9/]+$/g)) {
            this.criaErro(campo, 'USUARIO só pode conter letras e números')
            return false
        }

        return true
    }

    validPassword() {
        let valid = true
        const password = this.formulario.querySelector('#inputPassword');
        const passwordConfirm = this.formulario.querySelector('#inputPasswordConfirm');

        if (password.value !== passwordConfirm.value) {
            valid = false
            this.criaErro(password, 'As senhas precisam ser iguais');
            this.criaErro(passwordConfirm, 'As senhas precisam ser iguais')
        }
        return valid
    }
}

const formulario = new ValidaForm();

document.addEventListener('click', function (e){
    const element = e.target
    const displayRegister = document.querySelector('.cadastro')
    const displayLogin = document.querySelector('.login')
    if (element.classList.contains('toLogin')) {
        displayRegister.style.display = 'none'
        displayLogin.style.display = 'block'
    }

    if (element.classList.contains('toRegister')) {
        displayLogin.style.display = 'none'
        displayRegister.style.display = 'block'
    }
})