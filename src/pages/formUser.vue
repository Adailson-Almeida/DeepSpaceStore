<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

      return "Phone number needs to be at least 9 digits.";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    select(value) {
      if (value) return true;

      return "Select an item.";
    },
    checkbox(value) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

// Functions ViaCEP

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}; 
</script>

<template>
  <div>
    <v-img class="mb-5" height="300" src="@/assets/spacelogo.png" />
  </div>

  <v-container class="d-flex justify-end mt-10">

    <v-row>
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

          <div class="d-flex justify-end mt-8">
            <v-btn class="me-4 mb-5" type="submit"> Salvar </v-btn>

            <v-btn class="me-6" @click="handleReset"> Cancelar </v-btn>
          </div>
        </form>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <div>
          <v-img class="mb-5" height="200" src="@/assets/rocket-sf.png" />
        </div>
        <form @submit.prevent="submit">
          <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value" label="CEP *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
            label="Logradouro *" class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <!-- Alinhar Número e Complemento lado a lado -->
          <v-row class="mb-3 ms-3 mt-4 me-3">
            <v-col cols="4">
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Número *"
                style="max-width: 100%"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Complemento"
                style="max-width: 100%"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Bairro *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Cidade *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>

          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="UF *"
            class="mb-3 ms-6 mt-4 me-6" style="max-width: 100%"></v-text-field>
        </form>
      </v-col>

    </v-row>


  </v-container>
</template>
