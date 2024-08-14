<script setup>
import { ref, watch } from "vue";
import { useField, useForm, useSetFieldValue } from "vee-validate";


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faPix } from '@fortawesome/free-brands-svg-icons';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

library.add(faPix);
library.add(faFileInvoice);
library.add(faCreditCard);

const { handleSubmit, handleReset, validate } = useForm({
  validationSchema: {
    name: (value) => (!!value ? true : "Nome é obrigatório."),
    email: (value) =>
      /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)
        ? true
        : "Digite um e-mail válido.",
    phone: (value) => (!!value ? true : "Telefone é obrigatório."),
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
const cep = useField("cep");
const numberCard = useField("numberCard");
const nameCard = useField("nameCard");
const validity = useField("validity");
const securityCode = useField("securityCode");


const { value: logradouro, errorMessage: logradouroError, setValue: setLogradouro } = useField('logradouro');

const { value: numero, errorMessage: numeroError, setValue: setNumero } = useField('numero');

const { value: complemento, setValue: setComplemento } = useField('complemento');

const { value: bairro, errorMessage: bairroError, setValue: setBairro } = useField('bairro');

const { value: localidade, errorMessage: localidadeError, setValue: setLocalidade } = useField('localidade');

const { value: uf, errorMessage: ufError, setValue: setUf } = useField('uf');

const dataCard = ref(false);
const valid = ref(true);
const dialog = ref(false);
const cpf = ref({
  value: '',
  errorMessage: ''
});

watch(() => cpf.value.value, (newValue) => {
  if (cpf.value.errorMessage) {
    cpf.value.errorMessage = '';
  }
});

const submit = handleSubmit((values, actions) => {
  if (Object.keys(errors.value).length === 0) {

    return true;
  } else {

    return false;
  }
});

const validateAndOpenDialog = async () => {
  const { valid, errors } = await validate({
    fields: ["name", "email", "phone", "cep", "logradouro", "numero", "bairro", "localidade", "uf"],
  });

  console.log("Resultado da validação inicial:", { valid, errors });

  if (valid) {
    dialog.value = true;
  } else {
    console.log("Existem campos inválidos.", errors);
  }
};

const validateCpfAndFinalize = async () => {
  if (IsValidCPF(cpf.value.value)) {
    confirmPayment();
  } else {
    console.log("CPF inválido.");
    cpf.value.errorMessage = "CPF inválido.";
  }
};

const validCard = [
  v => !!v || 'O número do cartão é obrigatório',
  v => /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(v) || 'Formato inválido. Use ####-####-####-####',
  v => luhnCheck(v.replace(/-/g, '')) || 'Número de cartão inválido'
];

function luhnCheck(value) {
  let sum = 0;
  let shouldDouble = false;

  // Loop através dos dígitos do número do cartão de trás para frente
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (sum % 10 === 0);
}

const confirmPayment = () => {

  console.log("Pagamento confirmado!");
};

function IsValidCPF(value) {
  try {
    const text = value.replace(/[^\d]+/g, '');

    if (text.length != 11) {
      return false;
    }
    for (let i = 0; i < 10; i++) {
      if (parseFloat(text) == i * 11111111111) {
        return false;
      }
    }

    const text2 = text.substring(0, 9);
    const text3 = text.substring(9, 11);
    let num = 0;

    for (let j = 0; j < 9; j++) {
      num += parseInt(text2[j]) * (10 - j);
    }

    num = 11 - num % 11;
    if (num > 9) {
      num = 0;
    }

    if (parseInt(text3.substring(0, 1)) != num) {
      return false;
    }

    num *= 2;
    for (let k = 0; k < 9; k++) {
      num += parseInt(text2[k]) * (11 - k);
    }

    num = 11 - num % 11;
    if (num > 9) {
      num = 0;
    }

    if (parseInt(text3[1]) != num) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

const cancelForm = () => {
  handleReset();
  dialog.value = false;
  dataCard.value = false;
};

function cleanForm_Cep() {
  logradouro.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
}

async function findZip_Code(valor) {

  const cep = valor.replace(/\D/g, "");

  if (cep) {
    const validcep = /^[0-9]{8}$/;
    if (validcep.test(cep)) {
      setLogradouro("");
      setBairro("");
      setNumero("");
      setComplemento("");
      setLocalidade("");
      setUf("");

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const content = await response.json();

        if (!content.erro) {

          setLogradouro(content.logradouro || "");
          setBairro(content.bairro || "");
          setLocalidade(content.localidade || "");
          setNumero(content.numero || "");
          setComplemento(content.complemento || "");
          setUf(content.uf || "");
        } else {
          cleanForm_Cep();
          alert("CEP não encontrado.");
        }
      } catch (error) {
        cleanForm_Cep();
        alert("Erro ao buscar o CEP.");
      }
    } else {
      cleanForm_Cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    cleanForm_Cep();
  }
}


function btnCred_Card() {
  dataCard.value = !dataCard.value;
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
          <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Nome *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-mask="'(##) #####-####'" v-model="phone.value.value" maxlength="15"
            :error-messages="phone.errorMessage.value" label="Telefone *" class="mb-3 ms-6 mt-4 me-6"
            style="max-width: 100%"></v-text-field>

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
          <v-text-field v-mask="'#####-###'" v-model="cep.value.value" @blur="findZip_Code(cep.value.value)"
            maxlength="9" :error-messages="cep.errorMessage.value" label="CEP *" class="mb-3 ms-6 mt-4 me-6"
            style="max-width: 100%"></v-text-field>

          <v-text-field v-model="logradouro" :error-messages="logradouroError" label="Logradouro *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>


          <v-row class="mb-3 ms-3 mt-4 me-3">
            <v-col cols="4">
              <v-text-field v-model="numero" maxlength="6" label="Número *" :error-messages="numeroError"
                style="max-width: 100%"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="complemento" label="Complemento" style="max-width: 100%"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="bairro" label="Bairro *" :error-messages="bairroError" class="mb-3 ms-6 mt-4 me-6"
            style="max-width: 100%"></v-text-field>

          <v-text-field v-model="localidade" label="Cidade *" :error-messages="localidadeError"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="uf" label="UF *" :error-messages="ufError" class="mb-3 ms-6 mt-4 me-6"
            style="max-width: 100%"></v-text-field>

          <div class="d-flex justify-end mt-8">
            <v-btn class="me-4 mb-5 text-white" color="#0e99af" @click="validateAndOpenDialog" variant="flat">
              Ir Para o Pagamento
            </v-btn>
            <v-btn class="me-6" @click="cancelForm" color="red">Cancelar</v-btn>
            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <div class="mt-4">
                  <v-img class="mb-5" height="200" src="@/assets/formPay-sf.png" />
                </div>

                <v-radio-group class="ms-4">
                  <v-text-field v-mask="'###.###.###-##'" v-model="cpf.value" maxlength="14"
                    :error-messages="cpf.errorMessage" label="CPF *" class="mb-1 ms-2 me-6"
                    style="max-width: 78%"></v-text-field>

                  <v-checkbox label="PIX" color="#0e99af" class="ms-3" value="one"><font-awesome-icon
                      :icon="['fab', 'pix']" /></v-checkbox>
                  <v-checkbox label="BOLETO" color="#0e99af" class="ms-3" value="two"><font-awesome-icon
                      :icon="['fas', 'file-invoice']" /></v-checkbox>

                  <v-checkbox-btn label="CARTÃO DE CRÉDITO" v-model="dataCard" color="#0e99af" class="pe-2 ms-3"
                    @click="btnCred_Card"><font-awesome-icon :icon="['fas', 'credit-card']" /></v-checkbox-btn>

                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="10" v-if="dataCard">
                          <v-text-field v-mask="'####-####-####-####'" class="mb-3" v-model="numberCard"
                            :rules="validCard" label="N° do cartão*" hide-details required></v-text-field>

                          <v-text-field class="mb-3" :rules="validNameCard" label="Nome impresso no cartão*"
                            v-model="nameCard" hide-details required></v-text-field>

                          <v-row>
                            <v-col cols="6">
                              <v-text-field class="mb-3" v-model="validity" :counter="10" :rules="validDateCard"
                                label="Validade*" hide-details required></v-text-field>
                            </v-col>

                            <v-col cols="6">
                              <v-text-field class="mb-3" v-model="securityCode" :counter="10" :rules="validSecurity"
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
                  <v-btn text color="" class="bg-primary mb-4" @click="validateCpfAndFinalize">Finalizar Pedido</v-btn>
                  <v-btn text class="bg-red mb-4 me-6" @click="cancelForm">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
