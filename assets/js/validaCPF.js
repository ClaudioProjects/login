class ValidaCpf {
    constructor (cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
        this.cpfEnviado = cpfEnviado;
    }

    valida() {
        if (this.cpfLimpo.length != 11) return false;
        if (this.sequence()) return false;
        return this.logica();
    }

    cutConvert() {
        const cpfArray =  Array.from(this.cpfLimpo);
        const cpfCut = cpfArray.slice(0, -2);
        this.copyCpf = cpfCut.map(value => Number(value));  
    }

    addNum() {
        this.cutConvert()
        for (let i = 0; i < 2; i++) {
            let contador = this.copyCpf.length + 1;
            let valor = this.copyCpf
            .map(value => value * contador--)
            .reduce((cont, value) => cont += value);
            let result = 11 - (valor % 11);
            if (result > 9) result = 0;
            this.copyCpf.push(result);
        }
    }

    convertString(){
        this.addNum();
        this.copyCpf = this.copyCpf.join('');
    }

    sequence() {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    }

    logica() {
        this.convertString();
        return this.copyCpf === this.cpfLimpo;
    }
}


