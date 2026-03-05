
const gAtas = document.querySelector(".Gatas");
const gallery = document.querySelector(".gambarkecil");
const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");

async function loadImages() {
  const res = await fetch("http://localhost:5000/images");
  const images = await res.json();
  gallery.innerHTML = "";
  images.forEach((src) => {

    const wrapper = document.createElement("div");
    wrapper.classList.add("thumbnail");

    const img = document.createElement("img");
    img.src = `http://localhost:5000/${src}`;
    img.className = "Gkecil";

    img.addEventListener("click", () => {
      gAtas.src = img.src;
    });

    const btn = document.createElement("button");
    btn.innerText = "Hapus";
    btn.classList.add("delete-btn");

    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

      const filename = src.split("/").pop();

      await fetch(`http://localhost:5000/delete?file=${filename}`, {
        method: "DELETE"
      });

      loadImages();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    gallery.appendChild(wrapper);

  });
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const file = fileInput.files[0];

  if (!file) {
    alert("Pilih file dulu");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData
  });

  fileInput.value = "";
  loadImages();

});

loadImages();