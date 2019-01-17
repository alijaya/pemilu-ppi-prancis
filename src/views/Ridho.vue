<template>
  <el-main class="ridho center">
    <CanVote />
    <article class="article">
      <h1>Ridho Indawan Utomo dan Naufal Avira Dani</h1>
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/4IXwESJffpY" frameborder="0"  allowfullscreen></iframe>
      </div>
      <p>
        <img src="@/assets/ridho_avira.jpg" class="full-width" />
      </p>
      <p>
        Salam sejahtera bagi kita semua. Bonjour a tous!
      </p>
      <p>
        Surat ini, melatar belakangi motivasi pencalonan diri saya, Ridho Indawan Utomo, mencalonkan diri menjadi Ketua PPI Prancis periode 2018/2019. Saya maju didampingi oleh seorang wakil, Naufal Avira Dani, yang merupakan mahasiswi dari Caen yang turut aktif, hampir dua tahun, dalam PPI Caen serta PPI Dunia.
      </p>
      <p>
        Dalam membentuk visi dan misi, saya berhipotesa awal bahwa adanya urgensi meningkatkan koordinasi terpusat dalam menyelaraskan struktur PPI wilayah,tanpa mengesampingkan kemandirian, kreativitas dan potensi wilayah masing-masing. Harapan saya, PPI Prancis akan menjadi tempat PPI wilayah bertukar pikiran untuk saling menginspirasi dalam berkontribusi aktif sebagai pelajar Indonesia. 
      </p>
      <p>
        Sehingga dari analisis kondisi yang saya lakukan, saya bervisi untuk “PPI Prancis yang terkoordinasi secara menyeluruh dan transparan sebagai bentuk kontribusi dari dan untuk Indonesia.” Dalam realisasi visi saya, program kerja yang dapat mencakup adalah :
      </p>
      <ol>
        <li>
          Timeline Tematik (untuk kepengurusan PPI):
          <ol type="a">
            <li>Mengusungkan timeline tematik utama yang untuk menyelaraskan keberlangsungan program kerja dan periode organisasi PPI wilayah</li>
            <li>Menciptakan kolaborasi seluruh PPI wilayah dalam suatu acara yang diawasi langsung oleh PPI Prancis</li>
            <li>Membangkitkan tingkat keaktifan di masing-masing PPI wilayah</li>
            <li>Pelaksanaannya umumnya akan terdapat acara yang bertema yang akan serempak dilaksanakan di setiap PPI Wilayah.</li>
          </ol>
        </li>
        <li>
          Liga wilayah dengan PPI Gala di akhir kepengurusan
          <ol type="a">
            <li>Mewadahi masing-masing PPI wilayah untuk berkreasi dan berkompetisi dalam berkontribusi bagi Indonesia</li>
            <li>Kompetisi antar wilayah dalam bentuk keaktifan dalam membuat aktivitas dan konten yang akan dilombakan oleh PPI Prancis mengacu pada timeline tematik.</li>
            <li>Melaporkan perkembangan kegiatan PPI wilayah secara transparan kepada semua anggota PPI Prancis</li>
            <li>Membukukan pencapaian yang diraih oleh pelajar Indonesia yang ada di Prancis</li>
            <li>Acara Gala merupakan acara penghargaan di akhir kepengurusan dari semua kegiatan yang telah dilakukan dan menjadi ajang pertemuan dan silaturahmi para anggota PPI wilayah</li>
          </ol>
        </li>
        <li>
          Rapat koordinasi setiap bulan utk pengurus PPI Wilayah
          <ol type="a">
            <li>Mewadahi tukar pikiran dan inspirasi dalam diskusi untuk mengevaluasi kerja yang telah dilakukan</li>
            <li>Menjalin silaturahmi antar PPI wilayah dan memperkuat relasi antar pelajar di Prancis</li>
            <li>Sebelum keberlangsungan rapat online ini, akan diciptakan laporan kegiatan bulanan dari masing-masing ketua PPI wilayah.</li>
          </ol>
        </li>
        <li>
          Kunjungan PPI prancis ke PPI wilayah
          <ol type="a">
            <li>Melakukan sosialisasi program kerja PPI Prancis ke pengurus dan anggota PPI wilayah di Prancis</li>
            <li>Meningkatkan silaturahmi dan menghimpun saran secara langsung dari anggota PPI wilayah</li>
          </ol>
        </li>
        <li>Mengadakan OKTI (Olimpiade Karya Tulis Inovatif)
          <ol type="a">
            <li>Menjadi wadah untuk berinovasi dan berkompetisi para pelajar Indonesia</li>
            <li>Menjadi kontribusi konkrit pelajar dalam berinovasi untuk Indonesia.</li>
          </ol>
        </li>
      </ol>
      <p>
        Dalam pelaksanaan merealisasikan visi dan misi ini, saya memohon dukungan dari para rekan pelajar. Mari bersuara, berpendapat, memberi saran dan kritik, sebagai bentuk kontribusi kita bersama untuk PPI Prancis. #BersamaBerkarya
      </p>
      <p>
        Ridho Indawan Utomo dan Naufal Avira Dani
      </p>
    </article>
  </el-main>
</template>

<script>
// @ is an alias to /src
import CanVote from '@/components/CanVote'

export default {
  name: 'ridho',
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
