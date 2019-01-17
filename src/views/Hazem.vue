<template>
  <el-main class="hazem center">
    <CanVote />
    <article class="article">
      <h1>Hazem Anis Matta dan Yulia Purnamasari</h1>
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/PXHi7Fgj6Hw" frameborder="0"  allowfullscreen></iframe>
      </div>
      <p>
        <img src="@/assets/hazem_yulia.jpg" class="full-width" />
      </p>
      <p>
        Mengapa kita ada?
      </p>
      <p>
        Datang sebagai mahkluk terasing dengan keinginan meraup ilmu segudang dan hasrat berkontribusi yang membludak, kita sebagai manusia Indonesia yang merantau demi meraih ilmu dan pengalaman kehausan! Kehausan aliran air yang deras dan laut yang dalam untuk berkontribusi! Untuk bertarung dengan modal peluang dan ingin menjadi besar dan bermanfaat, untuk keluarga dan bangsa dan mungkin bagi sebagian agama. Karna dalam pedalaman jiwa yang paling dalam diantara kita, pernahlah terbersit ingin bahwa hari ini mungkin kita hanya atau baru disini, tapi besok bisa-bisa kita justru mendunia! Namun setelah bertabrakan dengan realita Prancis yang bagi sebagian begitu kejam – walau bagi sebagian mungkin justru malah romantis - kita mulai kehabisan daya keinginan untuk berkontribusi, untuk menjadi, untuk berguna. Mungkin lupa dan teracuhkan bisa kita salahkan.
      </p>
      <p>
        Namun ketahui, kita tidak sendirian dalam ruang perasaan tersebut. Ternyata pelajar Indonesia sebegitu banyaknya dan mungkin sebagian besar menemani kita dalam ruang tersebut, dengan tubuh yang tak terlihat. Karna kenapa? Mungkin karna kita tidak saling mencari, saling berusaha ditemukan dan tidak pula mulai menyusun bangunan komunikasi yang dimulai dengan sekadar sapaan.
      </p>
      <p>
        Ada yang merasa terbengkalai di Kota Perpignan, namun ada pula yang bercanda- tawa dengan sesama pelajar Indonesia di Caen. Ada yang merasa sendirian di Paris padahal kota tersebut tercatat sebagai penampung pelajar Indonesia terbanyak se- negara . Atau mungkin ada yang galau dengan hubungan cinta jarak-jauh namun tak tahu kemana dan siapa mencurahkan perasaan.
      </p>
      <p>
        Dan untuk sebab-sebab itu kita ada, dan diadakan. Oleh pelajar Indonesia terdahulu yang sama-sama merasakan perasaan yang sama.
      </p>
      <p>
        Dengan niatan silaturahmi dan komunikasi untuk bersama berkontribusi inilah PPI Prancis dan PPI Kota berada dan diadakan. Untuk merasa ditemani, untuk menemani, untuk berjuang bersama, berbagi rasa dan fikir berbeda di wadah besar bernama PPI Prancis.
      </p>
      <p>
        Namun, tanya seseorang, setelah lika-liku sejarah PPI, Paris lah yang diemaskan! Sementara kota-kota lain yang berpenghuni lebih sedikit semi-dikucilkan!
        Mungkin itu realita yang terjadi di beberapa potongan waktu dan zaman, tapi sebaliknya pula pasti pernah terjadi di masa lalu. Lalu bagaimana menyamaratakan cinta dan perhatian kepada semua anggota dimanapun mereka berada? Dengan komunikasi dan keberadaan fisik yang nyata di setiap bulannya, dengan bantuan dukungan acara yang ingin dicanangkan dan dibantu promosi dan alur pencarian dananya. Dengan keterwakilan PPI Prancis di pusat oleh wakil-wakilnya di setiap daerah dalam dinamika divisi komunikasi internal yang berniatan mendengarkan keluh-kesah, saran-kritik dan aspirasi fikir dan hati dari setiap daerah. Wakil-wakil ini yang nanti akan membawahi PPI-PPI daerah/wilayah dan menjadi Koordinator Regional dalam divisi Komunikasi Internal. Guna memperuncing dinamika komunikasi Pusat-Daerah, antara Ketua dan wakil dengan koordinator-koordinator ini, lalu koordinator dengan ketua-ketua PPI wilayah. sehingga tidak terjadi suatu ketidak-efektifan yang tak diperlukan karna ada yang merasa ditinggalkan atau tak didengarkan.
      </p>
      <p>
        jika itu semua adalah rencana kebijakan, maka dimana rencana program kerja kita? Saksikan debat kandidat di hari minggu ini dengan seksama, bersama kawan- kawan!
      </p>
      <p>
        Hazem dan Yulia. #IciEtLeMonde
      </p>
      <p>
        NO #2
      </p>
    </article>
  </el-main>
</template>

<script>
// @ is an alias to /src
import CanVote from '@/components/CanVote'

export default {
  name: 'hazem',
  components: {
    CanVote
  }
}
</script>

<style scoped>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.video-wrapper > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.full-width {
  width: 100%;
}
.article {
  max-width: 100%;
  width: 40em;
  line-height: 2em;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul, ol {
  padding-left: 1em;
}
</style>
