let technologies = [];

function imageClick(event) {
    event.preventDefault();

    let imageInput = document.getElementById('image');
    imageInput.click();
}

function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000);
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }

    return d;
}

let projectcard = '';
document.getElementById("project-container").innerHTML = '<h3 style="text-align: center;"> No projects found, please insert some projects first! </h3>';

function submitData(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    name.length >= 50 ? name = name.substring(0, 50) + '...' : name = name;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;
    let description = document.getElementById("description").value;
    description.length >= 80 ? description = description.substring(0, 80) + '...' : description = description;
    let tech = '';
    let image = document.getElementById("image").files;

    if (name == '') {
        alert('Please insert a project name!');
        return;
    } else if (startdate == '') {
        alert('Please insert a start date!');
        return;
    } else if (enddate == '') {
        alert('Please insert an end date!');
        return;
    } else if (Date.parse(startdate) > Date.parse(enddate)) {
        alert('Start date cannot be after end date!');
        return;
    } else if (description == '') {
        alert('Please insert a description!');
        return;
    } else if (technologies.length == 0) {
        alert('Please insert at least one technology!');
        return;
    } else if (image.length == 0) {
        alert('Please insert an image!');
        return;
    }

    for (let i = 0; i < technologies.length; i++) {
        tech += '<img src="assets/' + technologies[i] + '.png" alt="' + technologies[i] + '">';
    }

    let durasi = dhm((Date.parse(enddate) - Date.parse(startdate)));
    durasi = Math.floor(durasi / 30) <= 0 ? durasi + ' hari' : durasi % 30 == 0 ? Math.floor(durasi / 30) + ' bulan ' : Math.floor(durasi / 30) + ' bulan ' + durasi % 30 + ' hari';
    
    image = URL.createObjectURL(image[0]);

    projectcard += `
    <div class="project-card">
      <img src="${image}" alt="Maaf gambar tidak tersedia" class="project-card-image">
      <h3>
        <a href="myproject-detail.html">
          ${name}
        </a> <br>
        <b class="project-duration">
          durasi : ${durasi}
        </b>
      </h3>
      <p class="project-description">
        ${description}
      </p>
      <div class="project-technologies">
        ${tech}
      </div>
      <div class="project-action">
        <button class="project-button">edit</button>
        <button class="project-button">delete</button>
      </div>
    </div>
    `;

    document.getElementById("project-container").innerHTML = projectcard;
}

function checkboxCheck() {
    let nodejs = document.getElementById('nodejs');
    let reactjs = document.getElementById('reactjs');
    let nextjs = document.getElementById('nextjs');
    let typescript = document.getElementById('typescript');

    technologies = [];

    if (nodejs.checked) {
        technologies.push(nodejs.value);
    }

    if (reactjs.checked) {
        technologies.push(reactjs.value);
    }

    if (nextjs.checked) {
        technologies.push(nextjs.value);
    }

    if (typescript.checked) {
        technologies.push(typescript.value);
    }
}

function changeImageFilename() {
    if (document.getElementById('image').files.length > 0) {
        document.getElementById('myproject-input-image-name').innerHTML = document.getElementById('image').files[0].name;
    } else {
        document.getElementById('myproject-input-image-name').innerHTML = 'No image selected...';
    }
}