// Simulación de base de datos de usuarios
let users = JSON.parse(localStorage.getItem('users')) || [];

// Validación de correo
function validarCorreo(correo) {
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return regex.test(correo);
}

// Login con email/contraseña
document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (!validarCorreo(correo)) {
    Swal.fire({ icon: "error", title: "Correo inválido", text: "Correo no válido." });
    return;
  }

  if (clave.length < 6) {
    Swal.fire({ icon: "error", title: "Contraseña muy corta", text: "Debe tener al menos 6 caracteres." });
    return;
  }

  // Buscar usuario
  const user = users.find(u => u.email === correo);
  
  if (!user) {
    Swal.fire({ icon: "error", title: "Error", text: "Usuario no registrado" });
    return;
  }

  if (user.password !== clave) {
    Swal.fire({ icon: "error", title: "Error", text: "Contraseña incorrecta" });
    return;
  }

  // Guardar sesión
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  Swal.fire({
    icon: "success",
    title: "Bienvenido",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "https://christophermartin17.github.io/Portafolio/";
  });
});

// Registro de nuevo usuario
document.getElementById("registerLink").addEventListener("click", function (e) {
  e.preventDefault();

  Swal.fire({
    title: 'Crear nueva cuenta',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Correo electrónico">' +
      '<div class="password-container" style="position:relative;">' +
      '<input id="swal-input2" type="password" class="swal2-input" placeholder="Contraseña">' +
      '<i class="fas fa-eye password-toggle" onclick="toggleSwalPassword(\'swal-input2\', this)" style="position:absolute; right:10px; top:12px; cursor:pointer;"></i>' +
      '</div>' +
      '<div class="password-container" style="position:relative;">' +
      '<input id="swal-input3" type="password" class="swal2-input" placeholder="Confirmar contraseña">' +
      '<i class="fas fa-eye password-toggle" onclick="toggleSwalPassword(\'swal-input3\', this)" style="position:absolute; right:10px; top:12px; cursor:pointer;"></i>' +
      '</div>',
    focusConfirm: false,
    preConfirm: () => {
      const email = document.getElementById('swal-input1').value.trim();
      const pass = document.getElementById('swal-input2').value;
      const conf = document.getElementById('swal-input3').value;

      if (!validarCorreo(email)) return Swal.showValidationMessage('Correo inválido');
      if (pass.length < 6) return Swal.showValidationMessage('Contraseña mínima de 6 caracteres');
      if (pass !== conf) return Swal.showValidationMessage('Las contraseñas no coinciden');
      
      // Verificar si el usuario ya existe
      if (users.some(u => u.email === email)) {
        return Swal.showValidationMessage('Este correo ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = { email, password: pass };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      return true;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "https://christophermartin17.github.io/Portafolio/";
      });
    }
  });
});

// Mostrar/ocultar contraseña principal
document.getElementById('togglePassword').addEventListener('click', function () {
  const input = document.getElementById('clave');
  const icon = this;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
});

// Mostrar/ocultar en SweetAlert
window.toggleSwalPassword = function (inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
};

// Verificación de usuario activo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    console.log("Usuario autenticado:", JSON.parse(currentUser).email);
    // Opcional: redirigir directamente si ya está autenticado
    // window.location.href = "https://christophermartin17.github.io/Portafolio/";
  } else {
    console.log("No hay sesión activa.");
  }
});

// Deshabilitar los botones de redes sociales (ya que no tenemos autenticación real)
document.getElementById('googleLogin').addEventListener('click', (e) => {
  e.preventDefault();
  Swal.fire({ icon: 'info', title: 'Función no disponible', text: 'El login con Google no está implementado.' });
});

document.getElementById('facebookLogin').addEventListener('click', (e) => {
  e.preventDefault();
  Swal.fire({ icon: 'info', title: 'Función no disponible', text: 'El login con Facebook no está implementado.' });
});
