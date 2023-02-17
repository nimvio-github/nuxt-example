<script setup>
import Layout from "../components/Layout.vue";
import ComponentRenderer from "../components/ComponentRenderer.vue";

import "../styles/styles.css"

import "@fontsource/dm-sans"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"

const fetch = async (client) => {
  const { data: { Data: { content: contentData } } } = await getContentById(client, "Content_81b8facc-0e81-45fe-a9a9-2c2be581dbd9", { deep: true })
  const { data: { Data: headerData } } = await getContentById(client, "Content_a3231b18-5a13-47ce-b363-888fa8323cfa", { deep: true })
  const { data: { Data: footerData } } = await getContentById(client, "Content_30c29898-24c0-4f21-ae75-590d3040d629", { deep: true })

  return {
    contentData,
    headerData,
    footerData
  }
}

const { data } = useAsyncData('landing-page', async () => {
  const { $gqlClient } = useNuxtApp()
  return await fetch($gqlClient)
})

</script>
<template>
  <Layout v-if="data" :header-data="data.headerData" :footer-data="data.footerData">
    <Suspense>
      <component-renderer :contents="data.contentData" />
    </Suspense>
  </Layout>
</template>