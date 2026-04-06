import React, { useState } from 'react';
import FormInput from './components/FormInput';
import SelectDropdown from './components/SelectDropdown';

const FormPendaftaran = () => {
  // State untuk menyimpan nilai input
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    email: '',
    programStudi: '',
    semester: ''
  });

  // State untuk menyimpan error
  const [errors, setErrors] = useState({
    nama: '',
    umur: '',
    email: '',
    programStudi: '',
    semester: ''
  });

  // State untuk validasi keseluruhan
  const [isFormValid, setIsFormValid] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Options untuk select dropdown
  const programStudiOptions = [
    { value: '', label: 'Pilih Program Studi' },
    { value: 'teknik_informatika', label: 'Teknik Informatika' },
    { value: 'sistem_informasi', label: 'Sistem Informasi' },
    { value: 'teknik_komputer', label: 'Teknik Komputer' },
    { value: 'manajemen', label: 'Manajemen' },
    { value: 'desain_komunikasi_visual', label: 'Desain Komunikasi Visual' }
  ];

  const semesterOptions = [
    { value: '', label: 'Pilih Semester' },
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' }
  ];

  // Fungsi validasi untuk setiap field
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nama':
        if (!value.trim()) {
          error = 'Nama lengkap wajib diisi';
        } else if (/[0-9]/.test(value)) {
          error = 'Nama tidak boleh mengandung angka';
        } else if (value.length < 3) {
          error = 'Nama minimal 3 karakter';
        }
        break;

      case 'umur':
        if (!value) {
          error = 'Umur wajib diisi';
        } else if (isNaN(value)) {
          error = 'Umur harus berupa angka';
        } else if (value < 17 || value > 60) {
          error = 'Umur harus antara 17 - 60 tahun';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format email tidak valid';
        }
        break;

      case 'programStudi':
        if (!value) {
          error = 'Program Studi wajib dipilih';
        }
        break;

      case 'semester':
        if (!value) {
          error = 'Semester wajib dipilih';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Validasi field yang diubah
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Validasi semua field menggunakan data terbaru
    const allFields = ['nama', 'umur', 'email', 'programStudi', 'semester'];
    let isValid = true;
    const newErrors = {};

    allFields.forEach(field => {
      const fieldValue = field === name ? value : formData[field];
      const fieldError = validateField(field, fieldValue);
      newErrors[field] = fieldError;
      if (fieldError) isValid = false;
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  // Handler untuk select dropdown
  const handleSelectChange = (name, value) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Validasi field yang diubah
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Validasi semua field menggunakan data terbaru
    const allFields = ['nama', 'umur', 'email', 'programStudi', 'semester'];
    let isValid = true;
    const newErrors = {};

    allFields.forEach(field => {
      const fieldValue = field === name ? value : formData[field];
      const fieldError = validateField(field, fieldValue);
      newErrors[field] = fieldError;
      if (fieldError) isValid = false;
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  // Handler untuk submit
  const handleSubmit = () => {
    if (isFormValid) {
      setSubmittedData({ ...formData });
      alert('✨ Pendaftaran berhasil! Data Anda telah tersimpan.');
    }
  };

  // Mendapatkan label dari value select
  const getProgramLabel = (value) => {
    const option = programStudiOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const getSemesterLabel = (value) => {
    const option = semesterOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-slate-50 to-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Decorative soft elements */}
        <div className="absolute top-20 left-10 opacity-10 text-7xl">✦</div>
        <div className="absolute bottom-20 right-10 opacity-10 text-7xl">○</div>
        <div className="absolute top-40 right-20 opacity-5 text-6xl">◈</div>
        
        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
          {/* Header with soft pastel gradient */}
          <div className="bg-linear-to-r from-rose-200/80 via-amber-100/80 to-stone-200/80 px-6 py-8">
            <h1 className="text-3xl font-light text-stone-700 text-center tracking-wide">
              Form Pendaftaran Mahasiswa Baru
            </h1>
            <p className="text-stone-500 text-center mt-2 text-sm font-light">
              Tahun Akademik 2024/2025
            </p>
            <div className="flex justify-center gap-3 mt-4 text-stone-400 text-xl">
              <span>✧</span>
              <span>✧</span>
              <span>✧</span>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-8 py-8">
            <div className="space-y-5">
              <FormInput
                label="Nama Lengkap"
                name="nama"
                type="text"
                value={formData.nama}
                onChange={handleChange}
                placeholder="cth: Elin Gacor"
                error={errors.nama}
                required
              />

              <FormInput
                label="Umur"
                name="umur"
                type="number"
                value={formData.umur}
                onChange={handleChange}
                placeholder="cth: 20"
                error={errors.umur}
                required
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="elin@example.com"
                error={errors.email}
                required
              />

              <SelectDropdown
                label="Program Studi"
                name="programStudi"
                options={programStudiOptions}
                value={formData.programStudi}
                onChange={handleSelectChange}
                error={errors.programStudi}
                required
              />

              <SelectDropdown
                label="Semester"
                name="semester"
                options={semesterOptions}
                value={formData.semester}
                onChange={handleSelectChange}
                error={errors.semester}
                required
              />
            </div>

            {/* Conditional Rendering Tombol Submit */}
            {isFormValid && (
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  className="group w-full bg-linear-to-r from-rose-300/70 via-amber-300/70 to-stone-300/70 text-stone-700 font-medium py-3 px-4 rounded-2xl hover:from-rose-300 hover:via-amber-300 hover:to-stone-300 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-200/50 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✧</span>
                    Submit Pendaftaran
                    <span>✧</span>
                  </span>
                </button>
                <p className="text-center text-xs text-stone-400 mt-3 font-light">
                  klik untuk menyelesaikan pendaftaran
                </p>
              </div>
            )}

            {/* Conditional Rendering Hasil Submit */}
            {submittedData && (
              <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-200/50 shadow-sm">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2 text-rose-400">✧</div>
                  <h3 className="text-xl font-light text-stone-700 tracking-wide">
                    Pendaftaran Berhasil
                  </h3>
                  <div className="w-12 h-px bg-rose-200 mx-auto mt-2"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 border-b border-stone-100/50">
                    <span className="text-stone-400 text-sm w-28">Nama Lengkap</span>
                    <p className="text-stone-700 text-sm">{submittedData.nama}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border-b border-stone-100/50">
                    <span className="text-stone-400 text-sm w-28">Umur</span>
                    <p className="text-stone-700 text-sm">{submittedData.umur} tahun</p>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border-b border-stone-100/50">
                    <span className="text-stone-400 text-sm w-28">Email</span>
                    <p className="text-stone-700 text-sm">{submittedData.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border-b border-stone-100/50">
                    <span className="text-stone-400 text-sm w-28">Program Studi</span>
                    <p className="text-stone-700 text-sm">{getProgramLabel(submittedData.programStudi)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2">
                    <span className="text-stone-400 text-sm w-28">Semester</span>
                    <p className="text-stone-700 text-sm">{getSemesterLabel(submittedData.semester)}</p>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-stone-100/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">Status</span>
                    <span className="text-emerald-500">✓ Terdaftar</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-stone-500">No. Pendaftaran</span>
                    <span className="text-stone-500 font-mono text-xs">
                      {Math.random().toString(36).substr(2, 8).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-stone-400 text-xs font-light tracking-wide">
          <p>✦ pendaftaran mahasiswa baru ✦</p>
        </div>
      </div>
    </div>
  );
};

export default FormPendaftaran;