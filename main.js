// ============================
// INICIALIZAR SUPABASE
// ============================
const supabaseUrl = 'https://uqgioswtmkjdjuadoncn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ2lvc3d0bWtqZGp1YWRvbmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTYzMTcsImV4cCI6MjA2NTY3MjMxN30.vCLNRGVseLkR1RclsFanDUWYJXkib_X9Xx4kMNSBudM';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ============================
// MANEJAR ENVÍO DE FORMULARIO
// ============================
const formulario = document.getElementById('form-contacto');
const estado = document.getElementById('estado');

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();

  if (!nombre || !correo) {
    estado.textContent = 'Completa todos los campos.';
    estado.style.color = 'red';
    return;
  }

  const { data, error } = await supabase
    .from('contacto')
    .insert([{ nombre, correo }]);

  if (error) {
    estado.textContent = 'Error al enviar: ' + error.message;
    estado.style.color = 'red';
  } else {
    estado.textContent = '¡Datos enviados correctamente!';
    estado.style.color = 'green';
    formulario.reset();
  }
});
