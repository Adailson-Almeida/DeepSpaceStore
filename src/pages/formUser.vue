<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

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
      value?.length >= 2 ? true : "Name needs to be at least 2 characters.",
    phone: (value) =>
      value?.length > 9 && /^[0-9-]+$/.test(value)
        ? true
        : "Phone number needs to be at least 9 digits.",
    email: (value) =>
      /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)
        ? true
        : "Must be a valid e-mail.",
    cep: (value) => (/^[0-9]{8}$/.test(value) ? true : "CEP is required."),
    logradouro: (value) => (!!value ? true : "Logradouro is required."),
    numero: (value) => (!!value ? true : "Logradouro is required."),
    bairro: (value) => (!!value ? true : "Bairro is required."),
    cidade: (value) => (!!value ? true : "Cidade is required."),
    uf: (value) => (!!value ? true : "UF is required."),
  },
});

const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const cep = useField("cep");
const logradouro = useField("logradouro");
const numero = useField("numero");
const complemento = useField("complemento");
const bairro = useField("bairro");
const cidade = useField("cidade");
const uf = useField("uf");
var dataCard = false;

const dialog = ref(false);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

const validateAndOpenDialog = () => {
  submit(() => {
    dialog.value = true; // Open dialog after successful validation
  });
};

const cancelForm = () => {
  handleReset(); // Reset the form values
  dialog.value = false; // Close the dialog if open
};

function limpa_formulário_cep() {
  logradouro.value = "";
  bairro.value = "";
  cidade.value = "";
  uf.value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    logradouro.value = conteudo.logradouro;
    bairro.value = conteudo.bairro;
    cidade.value = conteudo.localidade;
    uf.value = conteudo.uf;
  } else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  const cep = valor.replace(/\D/g, "");

  if (cep) {
    const validacep = /^[0-9]{8}$/;
    if (validacep.test(cep)) {
      logradouro.value = "...";
      bairro.value = "...";
      cidade.value = "...";
      uf.value = "...";

      const script = document.createElement("script");
      script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
      document.body.appendChild(script);
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
          <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
            label="Nome *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
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
          <v-text-field v-model="cep.value.value" :counter="10" :error-messages="cep.errorMessage.value" label="CEP *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="logradouro.value.value" :counter="7" :error-messages="phone.errorMessage.value"
            label="Logradouro *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <!-- Alinhar Número e Complemento lado a lado -->
          <v-row class="mb-3 ms-3 mt-4 me-3">
            <v-col cols="4">
              <v-text-field v-model="numero.value.value" :error-messages="email.errorMessage.value" label="Número *"
                style="max-width: 100%"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="complemento.value.value" :error-messages="email.errorMessage.value"
                label="Complemento" style="max-width: 100%"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="bairro.value.value" :error-messages="email.errorMessage.value" label="Bairro *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="cidade.value.value" :error-messages="email.errorMessage.value" label="Cidade *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="uf.value.value" :error-messages="email.errorMessage.value" label="UF *"
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
                  <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
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

                          <v-text-field class="mb-3" v-model="lastname" :counter="10" :rules="nameRules"
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
