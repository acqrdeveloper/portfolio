<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-title">
        <h2>{{ selectedLanguage.Header.menu[8] }}</h2>
        <p>{{ selectedLanguage.SectionContact.p }}</p>
      </div>
      <div class="row" data-aos="fade-in">
        <div class="col-lg-5 d-flex align-items-stretch">
          <div class="row">
            <div class="col-lg-12 d-flex align-items-stretch">
              <div class="info">
                <h4 style="padding: 0">{{ selectedLanguage.SectionContact.contact.text }}</h4>
                <p style="padding: 0">{{ selectedLanguage.SectionContact.contact.value }}</p>
                <div class="email">
                  <i class="bi bi-envelope"></i>
                  <h4>{{ selectedLanguage.SectionContact.contact.email.text }}</h4>
                  <p>{{ selectedLanguage.SectionContact.contact.email.value }}</p>
                </div>
                <div class="address">
                  <i class="bi bi-geo-alt"></i>
                  <h4>{{ selectedLanguage.SectionContact.contact.location.text }}</h4>
                  <p>{{ selectedLanguage.SectionContact.contact.location.value }}</p>
                </div>
                <h4 style="padding: 0">{{ selectedLanguage.SectionContact.contact.socialnetwork.text }}</h4>
                <p style="padding: 0">{{ selectedLanguage.SectionContact.contact.socialnetwork.value }}</p>
                <div class="social-links" style="padding-left: 0">
                  <a v-for="(v, k) in selectedLanguage.SectionContact.contact.socialnetwork.networks" :key="k" :href="v.value" target="_blank">
                    <span :class="v.text"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form role="form" class="php-email-form" @submit.prevent="sendMessage">
            <div class="row">
              <div class="form-group col-md-12">
                <label for="name">{{ selectedLanguage.SectionContact.sendMessage.name.text }}</label>
                <input type="text" name="name" class="form-control" id="name" v-model="selectedLanguage.SectionContact.sendMessage.name.value" required />
              </div>
              <div class="form-group col-md-6">
                <label for="email">{{ selectedLanguage.SectionContact.sendMessage.email.text }}</label>
                <input type="email" class="form-control" name="email" id="email" v-model="selectedLanguage.SectionContact.sendMessage.email.value" required />
              </div>
              <div class="form-group col-md-6">
                <label for="phone">{{ selectedLanguage.SectionContact.sendMessage.phone.text }} <span class="small text-danger">(opcional)</span></label>
                <input type="text" name="phone" class="form-control" id="phone" v-model="selectedLanguage.SectionContact.sendMessage.phone.value" />
              </div>
            </div>
            <div class="form-group">
              <label for="subject">{{ selectedLanguage.SectionContact.sendMessage.subject.text }}</label>
              <input type="text" class="form-control" name="subject" id="subject" v-model="selectedLanguage.SectionContact.sendMessage.subject.value" required />
            </div>
            <div class="form-group">
              <label for="message">{{ selectedLanguage.SectionContact.sendMessage.message.text }}</label>
              <textarea class="form-control" name="message" id="message" rows="10" v-model="selectedLanguage.SectionContact.sendMessage.message.value" required></textarea>
            </div>
            <div class="text-center">
              <button v-if="!loadingButton" type="submit">{{ selectedLanguage.SectionContact.sendMessage.action.text }}</button>
              <button v-if="loadingButton" type="button" disabled>Enviando...</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { globalMixin } from "../../mixins/index.js";

const { selectedLanguage } = globalMixin();

// Store
const store = useStore();

// Parámetros del formulario
const params = ref({
  fullname: "",
  phone: "",
  subject: "",
  message: "",
  replyTo: "",
  toName: store.getters.env.toNameEmail,
  toEmail: store.getters.env.toMailEmail
});

// Estado del botón de carga
const loadingButton = computed(() => store.getters.loadingButton);

// Función para enviar el mensaje
const sendMessage = async () => {
  store.commit("setLoadingButton", true);

  try {
    await store.dispatch("ContactUs.sendMail", params.value);

    // Resetear los campos después del envío
    params.value.fullname = "";
    params.value.phone = "";
    params.value.subject = "";
    params.value.message = "";
    params.value.replyTo = "";
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};
</script>

<style scoped></style>
