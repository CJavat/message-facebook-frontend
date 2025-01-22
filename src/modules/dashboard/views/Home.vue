<template>
  <p class="text-2xl uppercase">Ingresa la información para enviar la campaña</p>
  <form
    class="mt-10 border border-black w-[500px] bg-black p-5 rounded-sm"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col gap-3 mb-5">
      <label for="laguageCode" class="text-xl">Código De Lenguaje</label>
      <input
        class="bg-zinc-950 outline-none focus:outline focus:outline-red-500 focus:placeholder:text-white"
        type="text"
        id="laguageCode"
        v-model="myForm.languageCode"
        placeholder="Ejemplo: es_MX"
        required
      />
    </div>

    <div class="flex flex-col gap-3 my-5">
      <label for="imageUrl" class="text-xl">URL De Imagen</label>
      <input
        class="bg-zinc-950 outline-none focus:outline focus:outline-red-500 focus:placeholder:text-white"
        type="text"
        id="imageUrl"
        v-model="myForm.imageUrl"
        placeholder="Ejemplo: https://www.dominio.com/url_de_la_imagen"
      />
    </div>

    <div class="flex flex-col gap-3 my-5">
      <label for="templateName" class="text-xl">Nombre De Plantilla</label>
      <input
        class="bg-zinc-950 outline-none focus:outline focus:outline-red-500 focus:placeholder:text-white"
        type="text"
        id="templateName"
        v-model="myForm.templateName"
        placeholder="plantilla_de_bienvenida"
        required
      />
    </div>

    <div class="flex flex-col gap-3 mt-5">
      <label for="phoneNumbers" class="text-xl">Telefonos</label>
      <textarea
        class="bg-zinc-950 outline-none focus:outline focus:outline-red-500 focus:placeholder:text-white resize-none h-32"
        id="phoneNumbers"
        v-model="myForm.phoneNumbers"
        placeholder="+523311225566, +526699887744"
        required
      ></textarea>
    </div>

    <input
      type="submit"
      value="Enviar Campaña"
      class="w-full uppercase border p-2 cursor-pointer mt-5 rounded-md hover:bg-white hover:text-black"
    />
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'

import { whatsappApi } from '@/api/whatsappApi'

const myForm = reactive({
  languageCode: '',
  imageUrl: '',
  templateName: '',
  phoneNumbers: '',
})

const handleSubmit = async () => {
  const phones = myForm.phoneNumbers
    .split(/[\n,]+/)
    .map((phone) => phone.trim())
    .map((phone) => phone.replace('+', ''))

  const repeatedPhoneNumbersExcluded = phones.filter((num, index, arr) => {
    return arr.indexOf(num) === index
  })

  const validPhoneNumbers = repeatedPhoneNumbersExcluded.filter((phone) =>
    phone.length >= 11 ? phone : null,
  )

  const bodyParsed = JSON.stringify({
    languageCode: myForm.languageCode,
    imageUrl: myForm.imageUrl,
    templateName: myForm.templateName,
    phoneNumbers: validPhoneNumbers,
  })

  try {
    const { data } = await whatsappApi.post('/send-template', bodyParsed)

    console.log({ 'Respuesta de la API': data })

    Swal.fire('Plantillas Enviadas', 'Las plantillas fueron enviadas con éxito', 'success')
  } catch (error) {
    console.error({ error })
    Swal.fire('Ha ocurrido un error', 'Ocurrió un error al enviar las plantillas', 'error')
  }
}
</script>
