<script setup>
import { ref } from "vue";
import { useField, useForm, useSetFieldValue } from "vee-validate";


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faPix } from '@fortawesome/free-brands-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

library.add(faPix);
library.add(faFileInvoice);
library.add(faCreditCard);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name: (value) =>
      value?.length >= 2 ? true : "Nome é obrigatório e deve conter mais de 2 caracteres.",
    email: (value) =>
      /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)
        ? true
        : "Digite um e-mail válido.",
    phone: (value) => (!!value ? true : "Telefone é obrigatório."),
    cpf: (value) => (!!value ? true : "CPF é obrigatório."),
    cep: (value) => (!!value ? true : "CEP é obrigatório."),
    logradouro: (value) => (!!value ? true : "Logradouro é obrigatório."),
    numero: (value) => (!!value ? true : "Número é obrigatório."),
    bairro: (value) => (!!value ? true : "Bairro é obrigatório."),
    localidade: (value) => (!!value ? true : "Cidade é obrigatório."),
    uf: (value) => (!!value ? true : "UF é obrigatório."),
  },
});

const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const cpf = useField("cpf");
const cep = useField("cep");

// const logradouro = useField("logradouro");
const { value: logradouro, errorMessage: logradouroError, setValue: setLogradouro } = useField('logradouro');
//const numero = useField("numero");
const { value: numero, errorMessage: numeroError, setValue: setNumero } = useField('numero');
//const complemento = useField("complemento");
const { value: complemento, setValue: setComplemento } = useField('complemento');
//const bairro = useField("bairro");
const { value: bairro, errorMessage: bairroError, setValue: setBairro } = useField('bairro');
//const cidade = useField("cidade");
const { value: localidade, errorMessage: localidadeError, setValue: setLocalidade } = useField('localidade');
//const uf = useField("uf");
const { value: uf, errorMessage: ufError, setValue: setUf } = useField('uf');
var dataCard = false;

const dialog = ref(false);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

const validateAndOpenDialog = () => {
  submit(() => {
    dialog.value = true;
  });
};

const cancelForm = () => {
  handleReset();
  dialog.value = false;
};

function limpa_formulário_cep() {
  logradouro.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
}

// function meu_callback(conteudo) {
//   if (!("erro" in conteudo)) {
//     logradouro.value = conteudo.logradouro;
//     bairro.value = conteudo.bairro;
//     cidade.value = conteudo.localidade;
//     uf.value = conteudo.uf;
//   } else {
//     limpa_formulário_cep();
//     alert("CEP não encontrado.");
//   }
// }

async function pesquisacep(valor) {
  console.log("CEP pesquisado:", valor);

  const cep = valor.replace(/\D/g, ""); // Remove qualquer caractere não numérico

  if (cep) {
    const validacep = /^[0-9]{8}$/;
    if (validacep.test(cep)) {
      setLogradouro("");
      setBairro("");
      setNumero("");
      setComplemento("");
      setLocalidade("");
      setUf("");

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const conteudo = await response.json();
        console.log("Dados recebidos:", conteudo);

        if (!conteudo.erro) {
          // Ajuste para acessar o valor correto se necessário
          setLogradouro(conteudo.logradouro || "");
          console.log("logradouro", logradouro)
          setBairro(conteudo.bairro || "");
          setLocalidade(conteudo.localidade || "");
          setNumero(conteudo.numero || "");
          setComplemento(conteudo.complemento || "");
          setUf(conteudo.uf || "");
        } else {
          limpa_formulário_cep();
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        limpa_formulário_cep();
        alert("Erro ao buscar o CEP.");
      }
    } else {
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    limpa_formulário_cep();
  }
}


function btnCartaoCredito() {
  dataCard = !dataCard;
}
</script>

<template>
  <div>
    <v-img class="mb-5" height="300" src="@/assets/spacelogo.png" />
  </div>

  <v-container class="d-flex justify-end mt-10">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <div>
          <v-img class="mb-5" height="200" src="@/assets/InfoUser-sf.png" />
        </div>

        <form @submit.prevent="submit">
          <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value"
            label="Nome *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-mask="'(##) #####-####'" v-model="phone.value.value" maxlength="15" :error-messages="phone.errorMessage.value"
            label="Telefone *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>
        </form>
      </v-col>

      <v-divider class="border-opacity-50 mb-10" :thickness="2" color="#0e99af" style="margin-top: 150px"
        vertical></v-divider>

      <v-col cols="12" md="6" lg="4">
        <div>
          <v-img class="mb-5" height="200" src="@/assets/rocket-sf.png" />
        </div>

        <form @submit.prevent="submit">
          <v-text-field v-mask="'#####-###'" v-model="cep.value.value" @blur="pesquisacep(cep.value.value)" maxlength="9" :error-messages="cep.errorMessage.value" label="CEP *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="logradouro" :error-messages="logradouroError"
            label="Logradouro *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <!-- Alinhar Número e Complemento lado a lado -->
          <v-row class="mb-3 ms-3 mt-4 me-3">
            <v-col cols="4">
              <v-text-field v-model="numero" maxlength="6" label="Número *" :error-messages="numeroError"
                style="max-width: 100%"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="complemento"
                label="Complemento" style="max-width: 100%"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="bairro"  label="Bairro *" :error-messages="bairroError"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="localidade"  label="Cidade *" :error-messages="localidadeError"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="uf"  label="UF *" :error-messages="ufError"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <div class="d-flex justify-end mt-8">
            <!-- Botão que abre o diálogo -->
            <v-btn class="me-4 mb-5 text-white" color="#0e99af" @click="dialog = true" variant="flat">
              Ir Para o Pagamento
            </v-btn>
            <v-btn class="me-6" @click="cancelForm" color="red">Cancelar</v-btn>
            <!-- O Dialog -->
            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <div class="mt-4">
                  <v-img class="mb-5" height="200" src="@/assets/formPay-sf.png" />
                </div>

                <v-radio-group class="ms-4">
                  <v-text-field v-mask="'###.###.###-##'" v-model="cpf.value.value" :counter="14" maxlength="14" :error-messages="cpf.errorMessage.value"
                    label="CPF *" class="mb-1 ms-2 me-6" style="max-width: 80%"></v-text-field>

                  <v-radio label="PIX" color="#0e99af" class="ms-3" value="one"><font-awesome-icon :icon="['fab', 'pix']" /></v-radio>
                  <v-radio label="BOLETO" color="#0e99af" class="ms-3" value="two"><font-awesome-icon :icon="['fas', 'file-invoice']" /></v-radio>


                  <v-checkbox-btn label="CARTÃO DE CRÉDITO" color="#0e99af" v-model="infocard" class="pe-2 ms-3"
                    @click="btnCartaoCredito"><font-awesome-icon :icon="['fas', 'credit-card']" /></v-checkbox-btn>

                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="10" v-if="dataCard">
                          <v-text-field class="mb-3" v-model="firstname" :counter="10" :rules="nameRules"
                            label="N° do cartão*" hide-details required></v-text-field>

                          <v-text-field class="mb-3" v-model="lastname" :rules="nameRules"
                            label="Nome impresso no cartão*" hide-details required></v-text-field>

                          <v-row>
                            <v-col cols="6">
                              <v-text-field class="mb-3" v-model="validity" :counter="10" :rules="nameRules"
                                label="Validade*" hide-details required></v-text-field>
                            </v-col>

                            <v-col cols="6">
                              <v-text-field class="mb-3" v-model="securityCode" :counter="10" :rules="nameRules"
                                label="Cód. de segurança*" hide-details required></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>

                      </v-row>
                    </v-container>
                  </v-form>

                </v-radio-group>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="" class="bg-primary mb-4" @click="confirmPayment">Finalizar Pedido</v-btn>
                  <v-btn text class="bg-red mb-4 me-6" @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
