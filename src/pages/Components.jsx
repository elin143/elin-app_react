import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import ProductsSection from "../components/ProductsSection";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000",
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000",
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000",
    },
  ];

  const featureItems = [
    {
      icon: "01",
      title: "Cepat",
      description: "Komponen dibuat ringan dan mudah dipakai ulang.",
    },
    {
      icon: "02",
      title: "Rapi",
      description: "Tampilan konsisten dengan style Tailwind yang sederhana.",
    },
    {
      icon: "03",
      title: "Reusable",
      description:
        "Cocok digunakan di banyak halaman tanpa menulis ulang kode.",
    },
  ];

  const sectionProducts = [
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      title: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000",
      description: "Sepatu sport modern untuk aktivitas sehari-hari.",
    },
    {
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      title: "Smartphone",
      category: "Elektronik",
      price: "Rp 4.500.000",
      description:
        "Smartphone cepat dengan kamera jernih dan baterai tahan lama.",
    },
  ];

  return (
    <>
      <div className="p-6">
        <PageHeader title="Components" breadcrumb={["Home", "Components"]} />

        {/* Mengggunakan Button Component */}
        <Button type="success">Simpan</Button>
        <Button type="danger">Hapus</Button>

        {/* Button tanpa menggunakan Component */}
        <Button>Booking Sekarang</Button>

        <Button type="premium">Join VIP Membership</Button>

        <Button type="success">Konfirmasi Pembayaran</Button>

        <Button type="warning">Jadwalkan Ulang</Button>

        <Button type="danger">Batalkan Reservasi</Button>

        <Button type="secondary">Lihat Detail</Button>

        {/* Mengggunakan Badge Component */}
        <div className="flex gap-2 flex-wrap">
          <Badge>Facial</Badge>

          <Badge type="premium">Premium Member</Badge>

          <Badge type="success">Treatment Selesai</Badge>

          <Badge type="warning">Menunggu Konfirmasi</Badge>

          <Badge type="danger">Jadwal Dibatalkan</Badge>

          <Badge type="secondary">Skincare</Badge>
        </div>

        {/* Mengggunakan Avatar Component */}
        <Avatar name="Seonghyeon" />
        <Avatar name="Sunghoon" />

        {/* Mengggunakan Container Component */}
        <Container className="bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

          <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
        </Container>

        {/* Mengggunakan Card Component */}
        <Card>
          <h2 className="text-xl font-bold">Judul Card</h2>
          <p className="text-gray-600">Ini adalah isi dari card.</p>
          <Badge type="success">Success</Badge>
          <Button type="success">Simpan</Button>
        </Card>

        {/* Mengggunakan ProductCard Component */}
        <ProductCard
    image="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    title="Glow Facial Treatment"
    category="Facial"
    price="Rp 250.000"
    description="Perawatan wajah untuk mencerahkan kulit dan membuat wajah tampak lebih glowing alami."
/>

<ProductCard
    image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    title="Acne Care Therapy"
    category="Treatment"
    price="Rp 300.000"
    description="Perawatan khusus untuk mengurangi jerawat, kemerahan, dan menenangkan kulit sensitif."
/>

<ProductCard
    image="https://images.unsplash.com/photo-1596178065887-1198b6148b2f?auto=format&fit=crop&w=800&q=80"
    title="Hydra Glow Skin Booster"
    category="Skin Booster"
    price="Rp 450.000"
    description="Infus skin booster untuk hidrasi kulit agar lebih kenyal, sehat, dan glowing."
/>

        {/* Mengggunakan Table Component */}
        <Table
    headers={[
        "Nama Pasien",
        "Treatment",
        "Dokter",
        "Status"
    ]}
>
    <tr className="border-t border-pink-100 hover:bg-pink-50/50 transition">
        <td className="px-5 py-3 text-rose-700">Alya</td>
        <td className="px-5 py-3 text-rose-700">Facial Glow</td>
        <td className="px-5 py-3 text-rose-700">Dr. Maya</td>
        <td className="px-5 py-3">
            <span className="px-3 py-1 text-xs rounded-full bg-pink-200 text-rose-800">
                Selesai
            </span>
        </td>
    </tr>

    <tr className="border-t border-pink-100 hover:bg-pink-50/50 transition">
        <td className="px-5 py-3 text-rose-700">Nadia</td>
        <td className="px-5 py-3 text-rose-700">Acne Care</td>
        <td className="px-5 py-3 text-rose-700">Dr. Anna</td>
        <td className="px-5 py-3">
            <span className="px-3 py-1 text-xs rounded-full bg-fuchsia-200 text-fuchsia-800">
                Proses
            </span>
        </td>
    </tr>
</Table>

        {/* Mengggunakan Form Component */}
        <Card>
          <InputField
    label="Nama Lengkap"
    name="name"
    placeholder="Masukkan nama Anda"
/>

<InputField
    label="Email"
    name="email"
    type="email"
    placeholder="contoh@email.com"
/>

<InputField
    label="Nomor Telepon"
    name="phone"
    type="tel"
    placeholder="08xxxxxxxxxx"
/>

          <SelectField
    label="Pilih Treatment"
    name="treatment"
    options={[
        { value: "facial", label: "Facial Glow" },
        { value: "acne", label: "Acne Care Therapy" },
        { value: "booster", label: "Hydra Glow Booster" },
    ]}
/>

<SelectField
    label="Pilih Dokter"
    name="doctor"
    options={[
        { value: "dr_anna", label: "Dr. Anna (Skin Specialist)" },
        { value: "dr_maya", label: "Dr. Maya (Aesthetic Doctor)" },
    ]}
/>

          <TextArea
    label="Keluhan Kulit"
    name="complaint"
    placeholder="Jelaskan kondisi kulit Anda saat ini..."
/>

<TextArea
    label="Catatan Dokter"
    name="notes"
    placeholder="Hasil konsultasi atau rekomendasi treatment..."
    rows={5}
/>

          <Button type="primary">Kirim</Button>
        </Card>

        {/* Mengggunakan Feedback Component */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Feedback Component</h2>

          <Alert type="info" title="Konsultasi Gratis">
            Nikmati konsultasi kulit gratis dengan dokter kecantikan kami setiap
            hari Senin.
          </Alert>

          <Alert type="success" title="Reservasi Berhasil">
            Jadwal treatment Anda telah berhasil dibuat. Silakan datang 15 menit
            sebelum jadwal.
          </Alert>

          <Alert type="warning" title="Persiapan Treatment">
            Hindari penggunaan produk retinol dan AHA/BHA selama 24 jam sebelum
            treatment.
          </Alert>

          <Alert type="danger" title="Informasi Penting">
            Segera hubungi klinik apabila terjadi iritasi atau reaksi alergi
            setelah treatment.
          </Alert>

<Modal title="Konfirmasi Booking">
    Apakah Anda yakin ingin menyimpan jadwal treatment ini?
</Modal>
        </Card>

        {/* Mengggunakan Section Component */}
       <HeroSection
    title="Glow Up Your Natural Beauty ✨"
    subtitle="Perawatan kulit profesional dengan teknologi modern untuk hasil yang lebih cerah, sehat, dan glowing alami."
    buttonText="Book Treatment"
/>

        <FeatureSection
    features={[
        {
            icon: "✨",
            title: "Facial Treatment",
            description: "Perawatan wajah untuk kulit lebih glowing dan sehat."
        },
        {
            icon: "💆‍♀️",
            title: "Skin Therapy",
            description: "Terapi kulit untuk mengatasi jerawat dan kusam."
        },
        {
            icon: "💖",
            title: "Beauty Consultation",
            description: "Konsultasi langsung dengan dokter kecantikan profesional."
        }
    ]}
/>

        <ProductsSection products={sectionProducts} />

        {/* Mengggunakan Footer Component */}
        <Footer />
      </div>
    </>
  );
}
