const STORAGE_KEY = "diacore-demo-store-v1";
const SESSION_KEY = "diacore-demo-session-v1";
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DIALYSIS_ACCESS_TYPES = [
	{
		id: "AV Fistula",
		meaning: "A surgical connection between an artery and a vein, usually in the arm.",
		reason: "Often preferred for long-term dialysis because it uses the patient's own blood vessels and has lower infection and clotting risks."
	},
	{
		id: "AV Graft",
		meaning: "A synthetic tube placed under the skin to connect an artery and a vein.",
		reason: "An option when the patient's veins are not suitable for a fistula; it may be usable sooner, with higher infection and clotting risks."
	},
	{
		id: "Central Venous Catheter",
		meaning: "A flexible tube placed in a large vein, commonly in the neck, chest, or groin.",
		reason: "Used when dialysis is needed before a permanent access is ready; it is generally temporary and has higher infection risk."
	}
];
const HEMODIALYSIS_CATALOG = [
	{
		id: "core-equipment",
		title: "Core hemodialysis equipment",
		description: "Primary equipment used in hemodialysis",
		items: [
			["EQ-01", "Hemodialysis Machine", "Blood flow control, monitoring, and dialysate delivery", "1 unit", 250, 850],
			["EQ-02", "Water Treatment System (RO Unit)", "Production of purified water", "1 unit", 200, 700],
			["EQ-03", "Dialysis Recliner / Bed", "Patient positioning and patient care", "1 unit", 30, 100],
			["EQ-04", "Automated BP Monitor", "Vital sign monitoring", "1 unit", 5, 25],
			["EQ-05", "Clinical Digital Scale", "Weight measurement before and after dialysis", "1 unit", 8, 35],
			["EQ-06", "Defibrillator / Crash Cart", "Emergency standby", "1 unit", 15, 60],
			["EQ-07", "Microcentrifuge / Lab Equipment", "Blood sample processing", "1 unit", 5, 30]
		]
	},
	{
		id: "dialysis-circuit",
		title: "Dialysis circuit components",
		description: "Equipment components of the dialysis blood and dialysate circuit",
		items: [
			["CS-01", "Dialyzer (Artificial Kidney)", "", "1 piece", 1100, 1700],
			["CS-02", "Arterial & Venous Blood Tubing Set", "", "1 set", 150, 385],
			["CS-03", "Dialysate Concentrates (Acid + Bicarbonate)", "", "1 container", 150, 600]
		]
	},
	{
		id: "vascular-access",
		title: "Vascular access & cannulation",
		description: "Equipment used to access the patient's blood vessels",
		items: [
			["CS-04", "Fistula / Graft Needles", "", "2 needles", 88, 88],
			["CS-05", "Hemodialysis Catheter Kit", "", "1 kit", 2500, 5000, "+"],
			["CS-06", "Syringes (5-20 mL)", "", "2-4 pieces", 20, 80],
			["CS-07", "0.9% Saline Solution (1L bag/bottle)", "", "1-2 bottles", 90, 300]
		]
	},
	{
		id: "medications",
		title: "Medications & anticoagulants",
		description: "Medications and anticoagulants used during dialysis",
		items: [["CS-08", "Heparin / Anticoagulant", "", "1 vial (5 mL)", 80, 215]]
	},
	{
		id: "infection-control",
		title: "Infection control & dressing",
		description: "Equipment for infection prevention and protection of the access site",
		items: [
			["CS-09", "PPE Set", "Gloves, mask, gown, face shield", "1 set", 85, 135],
			["CS-10", "Antiseptic Swabs", "", "2-4 swabs", 20, 40],
			["CS-11", "Sterile Gauze + Hemostatic Pads", "", "1 pack", 25, 50],
			["CS-12", "Adhesive Fistula Band / Tape", "", "1 pack/portion", 20, 65],
			["CS-13", "Biohazard Bag + Sharps Container Portion", "", "1 session share", 15, 30]
		]
	}
];
const ADMIN_NUMBER_WORDS = [
	"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
	"eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
	"twentyone", "twentytwo", "twentythree", "twentyfour", "twentyfive", "twentysix", "twentyseven", "twentyeight", "twentynine", "thirty"
];

function createSeedAdmins() {
	return Array.from({ length: 30 }, (_, index) => {
		const number = index + 1;
		const paddedNumber = String(number).padStart(2, "0");
		return {
			id: `admin-${paddedNumber}`,
			username: `admin${paddedNumber}`,
			email: `admin${number}@diacore.com`,
			password: `admin${ADMIN_NUMBER_WORDS[index]}${number}`,
			name: `DIACORE Admin ${paddedNumber}`,
			birthday: "",
			age: "",
			gender: "",
			position: "Admin",
			address: "",
			education: "",
			employmentId: `DC-${paddedNumber}`,
			photo: "",
			nursePhoto: ""
		};
	});
}

function createSeedEquipment() {
	return [
		{ id: "equipment-001", name: "Dialyzer", stock: 30, unitPrice: 350, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-002", name: "Bloodline set", stock: 30, unitPrice: 180, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-003", name: "AV fistula needle", stock: 60, unitPrice: 25, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-004", name: "Sterile gauze", stock: 100, unitPrice: 5, usedQuantity: 0, usedCost: 0 }
	];
}

function createSeedEquipmentCatalog() {
	const units = {
		"EQ-01": "session allocation", "EQ-02": "session allocation", "EQ-03": "session allocation",
		"EQ-04": "session allocation", "EQ-05": "session allocation", "EQ-06": "session allocation", "EQ-07": "session allocation",
		"CS-01": "piece", "CS-02": "set", "CS-03": "container", "CS-04": "needles", "CS-05": "kit",
		"CS-06": "session pack (2-4 pieces)", "CS-07": "session pack (1-2 bottles)", "CS-08": "vial (5 mL)",
		"CS-09": "set", "CS-10": "session pack (2-4 swabs)", "CS-11": "pack", "CS-12": "pack/portion", "CS-13": "session share"
	};
	return HEMODIALYSIS_CATALOG.map((category) => ({
		id: category.id,
		title: category.title,
		description: category.description,
		items: category.items.map(([code, name, purpose, , priceMin, priceMax, openEnded]) => ({
			id: makeId("equipment-item"),
			code,
			name,
			purpose,
			quantity: code === "CS-04" ? 2 : 1,
			unit: units[code],
			priceMin: code === "CS-04" ? 44 : priceMin,
			priceMax: code === "CS-04" ? 44 : priceMax,
			openEnded: openEnded === "+"
		}))
	}));
}

function createSeedStore() {
	const patients = [
		{
			id: "patient-001",
			name: "Alex Reyes",
			email: "patient01@diacore.demo",
			password: "PatientDemo01!",
			birthday: "1985-06-14",
			age: 41,
			gender: "Female",
			address: "Marikina City",
			dialysisType: "Hemodialysis",
			center: "Marikina",
			dialysisDays: ["Monday", "Wednesday", "Friday"],
			registeredAt: "2026-09-01"
		},
		{
			id: "patient-002",
			name: "Jordan Santos",
			email: "patient02@diacore.demo",
			password: "PatientDemo02!",
			birthday: "1979-02-22",
			age: 47,
			gender: "Male",
			address: "Sumulong, Antipolo",
			dialysisType: "Peritoneal dialysis",
			center: "Sumulong",
			dialysisDays: ["Monday", "Wednesday", "Friday"],
			registeredAt: "2026-09-05"
		}
	];

	return {
		admins: createSeedAdmins(),
		patients,
		announcements: [{ id: "announcement-001", title: "Welcome to DIACORE", body: "Please contact your dialysis center if you need help with your appointment.", createdAt: "2026-09-01", author: "DIACORE Admin" }],
		notes: [
			{ id: "note-001", patientId: "patient-001", date: "2026-09-20", text: "Patient completed scheduled hemodialysis session. Continue monitoring as directed by the care team." },
			{ id: "note-002", patientId: "patient-002", date: "2026-09-21", text: "Routine peritoneal dialysis follow-up recorded by the care team." }
		],
		bills: [
			{ id: "bill-001", patientId: "patient-001", description: "Dialysis session", amount: 2500, status: "Pending", method: "Cash", updatedAt: "2026-09-20" },
			{ id: "bill-002", patientId: "patient-002", description: "Monthly dialysis supplies", amount: 1800, status: "Pending", method: "Cash", updatedAt: "2026-09-21" }
		],
		equipment: createSeedEquipment(),
		equipmentCatalog: createSeedEquipmentCatalog(),
		availableDays: ["Monday", "Wednesday", "Friday"],
		messages: [
			{ id: "message-001", patientId: "patient-001", senderId: "admin-01", senderRole: "admin", senderName: "DIACORE Admin 01", text: "Your next appointment is on Monday.", sentAt: "2026-09-22 09:00" }
		],
		notifications: [],
		audit: [{ id: "audit-001", text: "Demo records initialized", date: "2026-09-01" }]
	};
}

function getStore() {
	try {
		const savedStore = localStorage.getItem(STORAGE_KEY);
		if (savedStore) {
			const store = JSON.parse(savedStore);
			let changed = false;
			const availableDays = Array.isArray(store.availableDays) ? store.availableDays : DAY_NAMES;
			const savedAdmins = Array.isArray(store.admins) ? store.admins : [];
			const seededAdmins = createSeedAdmins();
			store.admins = seededAdmins.map((admin) => {
				const savedAdmin = savedAdmins.find((entry) => entry.id === admin.id);
				if (!savedAdmin) {
					changed = true;
					return admin;
				}
				if (savedAdmin.email !== admin.email || savedAdmin.password !== admin.password || savedAdmin.username !== admin.username) changed = true;
				return { ...savedAdmin, email: admin.email, password: admin.password, username: admin.username };
			});
			if (savedAdmins.length !== seededAdmins.length) changed = true;
			if (!Array.isArray(store.equipment)) {
				store.equipment = createSeedEquipment();
				changed = true;
			} else {
				store.equipment = store.equipment.map((item) => ({
					...item,
					stock: Math.max(0, Number(item.stock) || 0),
					unitPrice: Math.max(0, Number(item.unitPrice) || 0),
					usedQuantity: Math.max(0, Number(item.usedQuantity) || 0),
					usedCost: Math.max(0, Number(item.usedCost) || 0)
				}));
			}
			if (!Array.isArray(store.equipmentCatalog)) {
				store.equipmentCatalog = createSeedEquipmentCatalog();
				changed = true;
			}
			store.patients.forEach((patient) => {
				const validDays = (patient.dialysisDays || []).filter((day) => availableDays.includes(day));
				if (validDays.length !== (patient.dialysisDays || []).length) {
					patient.dialysisDays = validDays;
					changed = true;
				}
			});
			if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
			return store;
		}
		const store = createSeedStore();
		localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
		return store;
	} catch (error) {
		console.error("DIACORE demo storage is unavailable", error);
		return createSeedStore();
	}
}

function saveStore(store) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function makeId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHTML(value) {
	return String(value ?? "").replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;"
	})[character]);
}

function formatMoney(value) {
	return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function calculateEquipmentAmount(item) {
	const quantity = Math.max(0, Number(item.quantity) || 0);
	return {
		minimum: quantity * Math.max(0, Number(item.priceMin) || 0),
		maximum: quantity * Math.max(0, Number(item.priceMax) || 0),
		openEnded: quantity > 0 && Boolean(item.openEnded)
	};
}

function formatEquipmentRange(amount) {
	return `${formatMoney(amount.minimum)} - ${formatMoney(amount.maximum)}${amount.openEnded ? "+" : ""}`;
}

function getActivitySection(text) {
	const normalizedText = String(text || "").toLowerCase();
	if (/equipment|inventory|stock/.test(normalizedText)) return "equipment";
	if (/bill|payment/.test(normalizedText)) return "billing";
	if (/profile|patient information|account registered|patient record/.test(normalizedText)) return "profile";
	if (/schedule|availability/.test(normalizedText)) return "schedule";
	if (/nursing note|care note/.test(normalizedText)) return "notes";
	if (/announcement/.test(normalizedText)) return "announcements";
	if (/message/.test(normalizedText)) return "messages";
	return "general";
}

function getActivitySectionLabel(section) {
	return ({
		equipment: "Equipment",
		billing: "Billing",
		profile: "Profile",
		schedule: "Schedule",
		notes: "Nursing notes",
		announcements: "Announcements",
		messages: "Messages",
		general: "General"
	})[section] || "General";
}

function groupActivities(entries) {
	const groups = new Map();
	entries.forEach((entry) => {
		const section = entry.section || getActivitySection(entry.text);
		if (!groups.has(section)) groups.set(section, []);
		groups.get(section).push(entry);
	});
	return groups;
}

function addAudit(store, text, section = getActivitySection(text)) {
	store.audit.unshift({ id: makeId("audit"), text, section, date: new Date().toLocaleString(), seenBy: [] });
	store.audit = store.audit.slice(0, 100);
}

function addNotification(store, patientId, text, section = getActivitySection(text)) {
	store.notifications.unshift({ id: makeId("notification"), patientId, text, section, date: new Date().toLocaleString(), read: false });
}

function setSession(role, userId) {
	localStorage.setItem(SESSION_KEY, JSON.stringify({ role, userId }));
}

function getSession() {
	try {
		return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
	} catch {
		return null;
	}
}

function setupLocationSearch() {
	const locationInput = document.querySelector("#location-query");
	if (!locationInput) return;
	const locations = [...document.querySelectorAll(".location-item")];
	const locationEmpty = document.querySelector("#location-empty");
	locationInput.addEventListener("input", () => {
		const query = locationInput.value.trim().toLowerCase();
		let visibleCount = 0;
		locations.forEach((location) => {
			const isMatch = location.dataset.location.includes(query);
			location.hidden = !isMatch;
			if (isMatch) visibleCount += 1;
		});
		locationEmpty.hidden = visibleCount > 0;
	});
}

function setupAuth() {
	const patientRole = document.querySelector("#patient-role");
	if (!patientRole) return;
	document.querySelectorAll("[data-password-toggle]").forEach((button) => {
		button.addEventListener("click", () => {
			const passwordInput = document.getElementById(button.getAttribute("aria-controls"));
			const showPassword = passwordInput.type === "password";
			passwordInput.type = showPassword ? "text" : "password";
			button.textContent = showPassword ? "Hide" : "Show";
			button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
			button.setAttribute("aria-pressed", String(showPassword));
		});
	});

	const adminRole = document.querySelector("#admin-role");
	const patientTabs = document.querySelector("#patient-tabs");
	const adminTabs = document.querySelector("#admin-tabs");
	const signupForm = document.querySelector("#patient-signup-form");
	const patientLoginForm = document.querySelector("#patient-login-form");
	const adminLoginForm = document.querySelector("#admin-login-form");
	const signupTab = document.querySelector("#patient-signup-tab");
	const patientLoginTab = document.querySelector("#patient-login-tab");

	function showPatientForm(formName) {
		const showSignup = formName === "signup";
		signupForm.hidden = !showSignup;
		patientLoginForm.hidden = showSignup;
		signupTab.classList.toggle("active", showSignup);
		signupTab.setAttribute("aria-selected", String(showSignup));
		patientLoginTab.classList.toggle("active", !showSignup);
		patientLoginTab.setAttribute("aria-selected", String(!showSignup));
	}

	function showRole(role) {
		const isPatient = role === "patient";
		patientRole.classList.toggle("active", isPatient);
		patientRole.setAttribute("aria-pressed", String(isPatient));
		adminRole.classList.toggle("active", !isPatient);
		adminRole.setAttribute("aria-pressed", String(!isPatient));
		patientTabs.hidden = !isPatient;
		adminTabs.hidden = isPatient;
		signupForm.hidden = !isPatient || signupTab.getAttribute("aria-selected") !== "true";
		patientLoginForm.hidden = !isPatient || patientLoginTab.getAttribute("aria-selected") !== "true";
		adminLoginForm.hidden = isPatient;
	}

	patientRole.addEventListener("click", () => showRole("patient"));
	adminRole.addEventListener("click", () => showRole("admin"));
	signupTab.addEventListener("click", () => showPatientForm("signup"));
	patientLoginTab.addEventListener("click", () => showPatientForm("login"));

	signupForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(signupForm);
		const email = String(formData.get("patient-email")).trim().toLowerCase();
		const store = getStore();
		if (store.patients.some((patient) => patient.email === email && patient.password)) {
			signupForm.querySelector(".form-message").textContent = "An account already uses this email. Please log in.";
			return;
		}

		let patient = store.patients.find((entry) => entry.email === email);
		if (patient) {
			patient.name = String(formData.get("patient-name")).trim();
			patient.password = String(formData.get("patient-password"));
		} else {
			patient = {
				id: makeId("patient"),
				name: String(formData.get("patient-name")).trim(),
				email,
				password: String(formData.get("patient-password")),
				birthday: "",
				age: "",
				gender: "",
				address: "",
				dialysisType: "Not set",
				center: "Marikina",
				dialysisDays: [],
				registeredAt: new Date().toISOString().slice(0, 10)
			};
			store.patients.push(patient);
		}
		addAudit(store, `Patient account registered: ${patient.name}`);
		setSession("patient", patient.id);
		saveStore(store);
		window.location.href = "patient.html";
	});

	patientLoginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(patientLoginForm);
		const email = String(formData.get("patient-login-email")).trim().toLowerCase();
		const password = String(formData.get("patient-login-password"));
		const patient = getStore().patients.find((entry) => entry.email === email && entry.password === password);
		if (!patient) {
			patientLoginForm.querySelector(".form-message").textContent = "No matching patient account. Create an account first.";
			return;
		}
		setSession("patient", patient.id);
		window.location.href = "patient.html";
	});

	adminLoginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(adminLoginForm);
		const email = String(formData.get("admin-email")).trim().toLowerCase();
		const password = String(formData.get("admin-password"));
		const admin = getStore().admins.find((entry) => entry.email === email && entry.password === password);
		if (!admin) {
			adminLoginForm.querySelector(".form-message").textContent = "Invalid email or password. Use one of the 30 default demo accounts.";
			return;
		}
		setSession("admin", admin.id);
		window.location.href = "admin.html";
	});
}

function initLocationAndAuth() {
	setupLocationSearch();
	setupAuth();
	setupServicesSlider();

	const servicesLink = document.querySelector('.dc-nav a[href="#services"]');
	const servicesSection = document.querySelector('#services');
	const navLinks = document.querySelectorAll('.dc-nav a, .dc-header-action');

	function closeServicesPanel() {
		if (!servicesSection || !servicesLink) return;
		servicesSection.classList.remove('is-open');
		document.body.classList.remove('services-open');
		servicesLink.classList.remove('active');
		servicesLink.setAttribute('aria-expanded', 'false');
	}

	function openServicesPanel() {
		if (!servicesSection || !servicesLink) return;
		servicesSection.classList.add('is-open');
		document.body.classList.add('services-open');
		servicesLink.classList.add('active');
		servicesLink.setAttribute('aria-expanded', 'true');
	}

	if (servicesLink && servicesSection) {
		servicesLink.addEventListener('click', (event) => {
			event.preventDefault();
			const isOpen = servicesSection.classList.contains('is-open');
			if (isOpen) {
				closeServicesPanel();
			} else {
				openServicesPanel();
			}
		});

		navLinks.forEach((link) => {
			if (link === servicesLink) return;
			link.addEventListener('click', () => {
				if (servicesSection.classList.contains('is-open')) {
					closeServicesPanel();
				}
			});
		});
	}
}

function setupServicesSlider() {
	const visual = document.querySelector('[data-service-visual]');
	if (!visual) return;

	const services = [
		{
			title: "In-Center Hemodialysis",
			description: "The core service where patients visit 2 to 3 times a week for a machine to filter waste and fluid from their blood.",
			source: "Source: Mayo Clinic",
			image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
			alt: "Healthcare professional providing care in a clinical setting"
		},
		{
			title: "Home Dialysis Support & Training",
			description: "Guidance and training programs for patients and caregivers transitioning to home hemodialysis or peritoneal dialysis (PD).",
			source: "",
			image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
			alt: "Care team discussing a patient's treatment plan"
		},
		{
			title: "Routine Lab Testing",
			description: "On-site blood collection and basic metabolic panels to monitor iron, potassium, and calcium levels.",
			source: "",
			image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=85",
			alt: "Clinical laboratory testing equipment"
		},
		{
			title: "Dietary & Nutritional Counseling",
			description: "Specialized guidance from a renal dietitian to manage strict fluid and food restrictions.",
			source: "",
			image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85",
			alt: "Fresh ingredients arranged for nutrition counseling"
		},
		{
			title: "Anemia Management",
			description: "Routine administration of prescribed intravenous medications, such as iron supplements or Epogen, during standard treatment blocks.",
			source: "",
			image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=85",
			alt: "Healthcare provider preparing prescribed treatment"
		}
	];
	const title = document.querySelector('[data-service-title]');
	const description = document.querySelector('[data-service-description]');
	const source = document.querySelector('[data-service-source]');
	const image = document.querySelector('[data-service-image]');
	const caption = document.querySelector('[data-service-caption]');
	const counts = document.querySelectorAll('[data-service-count], [data-service-count-image]');
	const dots = [...document.querySelectorAll('[data-service-slide]')];
	let activeIndex = 0;
	let pointerStartX = null;

	function showService(index, direction) {
		activeIndex = (index + services.length) % services.length;
		const service = services[activeIndex];
		const count = `${String(activeIndex + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`;
		visual.classList.remove('is-sliding-next', 'is-sliding-previous');
		title.textContent = service.title;
		description.textContent = service.description;
		source.textContent = service.source;
		source.hidden = !service.source;
		image.src = service.image;
		image.alt = service.alt;
		void image.offsetWidth;
		visual.classList.add(direction > 0 ? 'is-sliding-next' : 'is-sliding-previous');
		caption.textContent = service.title;
		counts.forEach((element) => { element.textContent = count; });
		dots.forEach((dot, dotIndex) => {
			const isCurrent = dotIndex === activeIndex;
			dot.classList.toggle('is-current', isCurrent);
			if (isCurrent) dot.setAttribute('aria-current', 'true');
			else dot.removeAttribute('aria-current');
		});
	}

	document.querySelector('[data-service-previous]').addEventListener('click', () => showService(activeIndex - 1, -1));
	document.querySelector('[data-service-next]').addEventListener('click', () => showService(activeIndex + 1, 1));
	dots.forEach((dot) => dot.addEventListener('click', () => {
		const targetIndex = Number(dot.dataset.serviceSlide);
		const difference = targetIndex - activeIndex;
		const direction = Math.abs(difference) <= services.length / 2 ? Math.sign(difference) : -Math.sign(difference);
		if (difference !== 0) showService(targetIndex, direction);
	}));
	visual.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault();
			const direction = event.key === 'ArrowRight' ? 1 : -1;
			showService(activeIndex + direction, direction);
		}
	});
	visual.addEventListener('pointerdown', (event) => {
		pointerStartX = event.clientX;
	});
	visual.addEventListener('pointerup', (event) => {
		if (pointerStartX === null) return;
		const swipeDistance = event.clientX - pointerStartX;
		pointerStartX = null;
		if (Math.abs(swipeDistance) >= 45) {
			const direction = swipeDistance < 0 ? 1 : -1;
			showService(activeIndex + direction, direction);
		}
	});
	visual.addEventListener('pointercancel', () => { pointerStartX = null; });
}

const currentPage = document.body.dataset.page;
if (!currentPage || currentPage === "home") {
	initLocationAndAuth();
} else {
	initPortal(currentPage);
}

function initPortal(role) {
	const session = getSession();
	if (!session || session.role !== role) {
		window.location.replace("index.html#account");
		return;
	}

	let store = getStore();
	let currentUser = role === "admin"
		? store.admins.find((admin) => admin.id === session.userId)
		: store.patients.find((patient) => patient.id === session.userId);
	if (!currentUser) {
		localStorage.removeItem(SESSION_KEY);
		window.location.replace("index.html#account");
		return;
	}

	const viewContainer = document.querySelector("#portal-content");
	const menu = document.querySelector("#portal-menu");
	const menuToggle = document.querySelector("#menu-toggle");
	const menuClose = document.querySelector("#menu-close");
	const inCenterButton = document.querySelector("#in-center-button");
	const inCenterPanel = document.querySelector("#in-center-panel");
	const inCenterMinimize = document.querySelector("#in-center-minimize");
	const menuLinks = [...document.querySelectorAll("[data-view]")];
	const userLabel = document.querySelector("#portal-user");
	let activeView = role === "admin" ? "dashboard" : "announcements";
	let viewBeforeInCenter = activeView;
	let activeMessagePatientId = role === "patient" ? currentUser.id : store.patients[0]?.id;
	let activeNotePatientId = "";
	let activeEditingNoteId = "";
	let activeAccessPatientId = store.patients[0]?.id || "";
	let profilePhotoDraft = currentUser.photo || "";
	let nursePhotoDraft = currentUser.nursePhoto || "";

	const adminViews = [
		["dashboard", "Dashboard"], ["billing", "Billing"], ["equipment", "Equipment"], ["profile", "Profile"], ["nurses", "Nurses"], ["schedule", "Schedule"],
		["patients", "Patients"], ["announcements", "Announcement"], ["reports", "Report"], ["messages", "Message"]
	];
	const patientViews = [
		["announcements", "Announcement"], ["profile", "Profile"], ["nurses", "Nurses"], ["notes", "Nurses notes"], ["schedule", "Schedule"],
		["billing", "Billing"], ["notifications", "Notification"], ["messages", "Message"]
	];
	const availableViews = role === "admin" ? adminViews : patientViews;
	userLabel.textContent = role === "admin" ? currentUser.name : currentUser.name;

	function refreshStore() {
		store = getStore();
		currentUser = role === "admin"
			? store.admins.find((admin) => admin.id === session.userId)
			: store.patients.find((patient) => patient.id === session.userId);
		if (role === "admin") userLabel.textContent = currentUser.name;
	}

	function markActiveViewRead() {
		let changed = false;
		if (role === "patient" && activeView === "notifications") {
			store.notifications.forEach((notification) => {
				if (notification.patientId === currentUser.id && !notification.read) {
					notification.read = true;
					changed = true;
				}
			});
		}
		if (role === "admin" && activeView === "reports") {
			store.audit.forEach((entry) => {
				if (!Array.isArray(entry.seenBy)) entry.seenBy = [];
				if (!entry.seenBy.includes(currentUser.id)) {
					entry.seenBy.push(currentUser.id);
					changed = true;
				}
			});
		}
		if (changed) saveStore(store);
	}

	function updateNavigationIndicators() {
		menuLinks.forEach((link) => {
			const view = link.dataset.view;
			const hasUnread = role === "patient" && view === "notifications"
				? store.notifications.some((notification) => notification.patientId === currentUser.id && !notification.read)
				: role === "admin" && view === "reports"
					? store.audit.some((entry) => Array.isArray(entry.seenBy) && !entry.seenBy.includes(currentUser.id))
					: false;
			const indicator = link.querySelector(".nav-indicator");
			if (hasUnread && !indicator) {
				const dot = document.createElement("span");
				dot.className = "nav-indicator";
				dot.setAttribute("aria-hidden", "true");
				link.append(dot);
			} else if (!hasUnread && indicator) {
				indicator.remove();
			}
			const label = availableViews.find(([availableView]) => availableView === view)?.[1] || link.textContent.trim();
			link.setAttribute("aria-label", hasUnread ? `${label}, new activity` : label);
		});
	}

	function renderDialysisCenterInfo() {
		const patient = store.patients.find((entry) => entry.id === activeAccessPatientId);
		if (!patient) return `<div class="in-center-article"><h3>Dialysis access and schedule</h3><p>Add a patient record before assigning dialysis access and days.</p></div>`;
		const availableDayOptions = store.availableDays.map((day) => `<label class="day-option"><input type="checkbox" name="accessDays" value="${escapeHTML(day)}" ${(patient.dialysisDays || []).includes(day) ? "checked" : ""}><span>${escapeHTML(day)}</span></label>`).join("");
		return `
			<div class="in-center-article">
				<h3>Assign dialysis access</h3>
				<label class="message-patient-select">Choose patient<select data-access-patient>${patientOptions(activeAccessPatientId)}</select></label>
				<p class="field-hint">Choose the access type discussed with the patient. Hover or focus a choice for its meaning and reason.</p>
				<div class="access-choice-grid" role="radiogroup" aria-label="Dialysis access type">
					${DIALYSIS_ACCESS_TYPES.map((access, index) => `<label class="access-choice"><input type="radio" name="accessSite" value="${escapeHTML(access.id)}" ${patient.accessSite === access.id ? "checked" : ""} aria-describedby="access-tip-${index}"><span>${escapeHTML(access.id)}</span><span class="access-choice-tooltip" id="access-tip-${index}" role="tooltip"><strong>Meaning</strong> ${escapeHTML(access.meaning)}<strong>Reason</strong> ${escapeHTML(access.reason)}</span></label>`).join("")}
				</div>
				<div class="access-schedule" data-access-schedule ${patient.accessSite ? "" : "hidden"}>
					<h4>Available schedule for ${escapeHTML(patient.name)}</h4>
					${availableDayOptions ? `<div class="day-grid">${availableDayOptions}</div>` : `<p class="empty-state">Set available center days in Admin Schedule first.</p>`}
					<button class="primary-button" type="button" data-save-access-assignment>Save dialysis information</button>
				</div>
			</div>
		`;
	}

	function openMenu(isOpen) {
		menu.classList.toggle("is-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	}

	menuToggle.addEventListener("click", () => openMenu(!menu.classList.contains("is-open")));
	menuClose.addEventListener("click", () => openMenu(false));
	if (inCenterButton && inCenterPanel && inCenterMinimize) {
		const inCenterForm = inCenterPanel.querySelector(".in-center-form");
		if (inCenterForm) inCenterForm.innerHTML = renderDialysisCenterInfo();
		function setInCenterOpen(isOpen) {
			inCenterPanel.hidden = !isOpen;
			inCenterButton.hidden = isOpen;
			inCenterButton.setAttribute("aria-expanded", String(isOpen));
			inCenterButton.classList.toggle("active", isOpen);
			if (isOpen && inCenterForm) inCenterForm.innerHTML = renderDialysisCenterInfo();
		}
		inCenterButton.addEventListener("click", () => setInCenterOpen(inCenterPanel.hidden));
		inCenterMinimize.addEventListener("click", () => setInCenterOpen(false));
		inCenterForm.addEventListener("change", (event) => {
			if (event.target.matches("[data-access-patient]")) {
				activeAccessPatientId = event.target.value;
				inCenterForm.innerHTML = renderDialysisCenterInfo();
			} else if (event.target.matches('input[name="accessSite"]')) {
				inCenterForm.querySelector("[data-access-schedule]").hidden = false;
			}
		});
		inCenterForm.addEventListener("click", (event) => {
			if (!event.target.matches("[data-save-access-assignment]")) return;
			const patient = store.patients.find((entry) => entry.id === activeAccessPatientId);
			const accessSite = inCenterForm.querySelector('input[name="accessSite"]:checked')?.value;
			if (!patient || !accessSite) return;
			patient.accessSite = accessSite;
			patient.dialysisDays = [...inCenterForm.querySelectorAll('input[name="accessDays"]:checked')]
				.map((input) => input.value)
				.filter((day) => store.availableDays.includes(day));
			addNotification(store, patient.id, `Your dialysis access and schedule were updated by the care team: ${patient.accessSite}; ${patient.dialysisDays.join(", ") || "no days assigned"}.`, "schedule");
			addAudit(store, `Dialysis access and schedule updated for ${patient.name}: ${patient.accessSite}`, "schedule");
			saveStore(store);
			refreshStore();
			inCenterForm.innerHTML = renderDialysisCenterInfo();
		});
	}
	menuLinks.forEach((link) => link.addEventListener("click", (event) => {
		event.preventDefault();
		activeView = link.dataset.view;
		openMenu(false);
		renderView();
	}));
	document.querySelector("#logout-button").addEventListener("click", () => {
		localStorage.removeItem(SESSION_KEY);
		window.location.href = "index.html";
	});
	window.addEventListener("storage", (event) => {
		if (role !== "patient" || event.key !== STORAGE_KEY) return;
		refreshStore();
		if (activeView === "announcements") renderView();
	});

	function renderView() {
		refreshStore();
		markActiveViewRead();
		updateNavigationIndicators();
		menuLinks.forEach((link) => link.classList.toggle("active", link.dataset.view === activeView));
		const title = availableViews.find(([view]) => view === activeView)?.[1] || "Dashboard";
		document.querySelector("#view-title").textContent = title;
		viewContainer.innerHTML = role === "admin" ? renderAdminView(activeView) : renderPatientView(activeView);
		bindViewEvents();
	}

	function patientName(patientId) {
		return store.patients.find((patient) => patient.id === patientId)?.name || "Unknown patient";
	}

	function renderAdminView(view) {
		if (view === "dashboard") return renderAdminDashboard();
		if (view === "billing") return renderAdminBilling();
		if (view === "equipment") return renderEquipment();
		if (view === "profile") return renderAdminProfile();
		if (view === "nurses") return renderNurses(true);
		if (view === "schedule") return renderAdminSchedule();
		if (view === "patients") return renderAdminPatients();
		if (view === "announcements") return renderAdminAnnouncements();
		if (view === "reports") return renderAdminReports();
		return renderMessages(true);
	}

	function renderAdminDashboard() {
		const types = [...new Set(store.patients.map((patient) => patient.dialysisType || "Not set"))];
		const typeRows = types.map((type) => {
			const count = store.patients.filter((patient) => (patient.dialysisType || "Not set") === type).length;
			const percent = store.patients.length ? Math.round(count / store.patients.length * 100) : 0;
			return `<div class="metric-row"><div class="metric-label"><span>${escapeHTML(type)}</span><strong>${count}</strong></div><div class="metric-track"><span style="width:${percent}%"></span></div></div>`;
		}).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">OVERVIEW</p><h2>Dialysis cases</h2></div><span class="demo-chip">LOCAL DEMO DATA</span></div>
			<div class="stat-grid"><article class="stat-card"><span>REGISTERED PATIENTS</span><strong>${store.patients.length}</strong></article><article class="stat-card"><span>TOTAL CASE RECORDS</span><strong>${store.notes.length}</strong></article><article class="stat-card"><span>PENDING BILLS</span><strong>${store.bills.filter((bill) => bill.status === "Pending").length}</strong></article><article class="stat-card"><span>ANNOUNCEMENTS</span><strong>${store.announcements.length}</strong></article></div>
			<div class="portal-panel"><div class="panel-heading"><div><p class="portal-kicker">PATIENT CASES</p><h3>Patient count by dialysis type</h3></div></div><div class="metric-chart">${typeRows || "<p>No cases recorded yet.</p>"}</div></div>
			<div class="portal-panel"><div class="panel-heading"><div><p class="portal-kicker">RECENT PATIENTS</p><h3>Care roster</h3></div><button class="text-button" data-go-view="patients">View patients</button></div>${patientTable(store.patients.slice(-5).reverse(), false)}</div>`;
	}

	function patientTable(patients, actions = true) {
		if (!patients.length) return `<p class="empty-state">No patient records yet.</p>`;
		return `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Email</th><th>Dialysis type</th><th>Center</th>${actions ? "<th>Actions</th>" : ""}</tr></thead><tbody>${patients.map((patient) => `<tr><td>${escapeHTML(patient.name)}</td><td>${escapeHTML(patient.email)}</td><td>${escapeHTML(patient.dialysisType || "Not set")}</td><td>${escapeHTML(patient.center || "Not set")}</td>${actions ? `<td><button class="table-action" data-edit-patient="${escapeHTML(patient.id)}">Edit</button><button class="table-action danger" data-delete-patient="${escapeHTML(patient.id)}">Delete</button></td>` : ""}</tr>`).join("")}</tbody></table></div>`;
	}

	function patientOptions(selectedId = "") {
		return store.patients.map((patient) => `<option value="${escapeHTML(patient.id)}" ${patient.id === selectedId ? "selected" : ""}>${escapeHTML(patient.name)}</option>`).join("");
	}

	function renderAdminPatients(editPatient = null) {
		const patient = editPatient || {};
		const notePatient = store.patients.find((entry) => entry.id === activeNotePatientId);
		const editingNote = store.notes.find((note) => note.id === activeEditingNoteId && note.patientId === activeNotePatientId);
		const patientNotes = notePatient ? store.notes.filter((note) => note.patientId === notePatient.id) : [];
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT RECORDS</p><h2>Patients</h2></div><span class="demo-chip">ADMIN ONLY</span></div>
			<div class="portal-panel"><h3>${patient.id ? "Edit patient" : "Add patient record"}</h3><form id="admin-patient-form" class="form-grid"><input type="hidden" name="patientId" value="${escapeHTML(patient.id || "")}"><label>Full name<input name="name" value="${escapeHTML(patient.name || "")}" required></label><label>Email<input type="email" name="email" value="${escapeHTML(patient.email || "")}" required></label><label>Birthday<input type="date" name="birthday" value="${escapeHTML(patient.birthday || "")}"></label><label>Age<input type="number" min="0" name="age" value="${escapeHTML(patient.age || "")}"></label><label>Gender<select name="gender"><option value="">Choose</option>${["Female", "Male", "Other"].map((value) => `<option ${patient.gender === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Dialysis type<select name="dialysisType">${["Hemodialysis", "Peritoneal dialysis", "Not set"].map((value) => `<option ${patient.dialysisType === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Center<select name="center">${["Marikina", "Sumulong"].map((value) => `<option ${patient.center === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Home address<input name="address" value="${escapeHTML(patient.address || "")}"></label><div class="form-actions"><button class="primary-button" type="submit">${patient.id ? "Save patient" : "Add patient"}</button>${patient.id ? `<button class="secondary-button" type="button" data-cancel-patient-edit>Cancel</button>` : ""}</div></form></div>
			<div class="portal-panel"><h3>Nursing notes</h3><label class="message-patient-select">Choose patient<select id="note-patient-select"><option value="">Select a patient</option>${patientOptions(activeNotePatientId)}</select></label>${notePatient ? `<form id="nursing-note-form" class="form-grid"><input type="hidden" name="noteId" value="${escapeHTML(editingNote?.id || "")}"><label class="full-width">Nursing note<textarea name="text" rows="4" required>${escapeHTML(editingNote?.text || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editingNote ? "Save changes" : "Save note"}</button>${editingNote ? `<button class="secondary-button" type="button" data-cancel-note-edit>Cancel</button>` : ""}</div></form><h3>Notes for ${escapeHTML(notePatient.name)}</h3>${patientNotes.length ? `<div class="notes-list">${patientNotes.map((note) => `<article class="note-card"><div class="panel-heading"><p class="portal-kicker">${escapeHTML(note.date)}</p><button class="table-action" data-edit-note="${escapeHTML(note.id)}">Edit</button></div><p>${escapeHTML(note.text)}</p></article>`).join("")}</div>` : `<p class="empty-state">No nursing notes for this patient yet.</p>`}` : `<p class="empty-state">Select a patient to add or edit nursing notes.</p>`}</div>
			<div class="portal-panel"><div class="panel-heading"><h3>Patient directory (${store.patients.length})</h3></div>${patientTable(store.patients)}</div>`;
	}

	function renderAdminBilling(editBill = null) {
		const bill = editBill || {};
		return `<div class="section-heading"><div><p class="portal-kicker">PAYMENTS</p><h2>Billing</h2></div><span class="demo-chip">DEMO ONLY · NO CARD PROCESSING</span></div>
			<div class="portal-panel"><h3>${bill.id ? "Edit bill" : "Add bill"}</h3><form id="admin-bill-form" class="form-grid"><input type="hidden" name="billId" value="${escapeHTML(bill.id || "")}"><label>Patient<select name="patientId" required>${patientOptions(bill.patientId)}</select></label><label>Description<input name="description" value="${escapeHTML(bill.description || "Dialysis session")}" required></label><label>Amount (PHP)<input type="number" name="amount" min="0" step="0.01" value="${escapeHTML(bill.amount || "")}" required></label><label>Status<select name="status">${["Pending", "Paid", "Overdue"].map((value) => `<option ${bill.status === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Payment method<select name="method">${["Cash", "BPI", "PhilHealth", "BDO"].map((value) => `<option ${bill.method === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><div class="form-actions"><button class="primary-button" type="submit">${bill.id ? "Save bill" : "Add bill"}</button>${bill.id ? `<button class="secondary-button" type="button" data-cancel-bill-edit>Cancel</button>` : ""}</div></form></div>
			<div class="portal-panel"><h3>Patient bills</h3>${renderBillsTable(store.bills, true)}</div>`;
	}

	function renderEquipment() {
		const categories = store.equipmentCatalog || [];
		const itemForm = (item, category) => `<form class="equipment-item-form" data-item-id="${escapeHTML(item.id)}" data-category-id="${escapeHTML(category.id)}" data-cost-group="${category.id === "core-equipment" ? "core" : "consumables"}">
			<input type="hidden" name="itemId" value="${escapeHTML(item.id)}">
			<div class="equipment-item-fields">
				<label>Code<input name="code" value="${escapeHTML(item.code)}" required></label>
				<label>Item name<input name="name" value="${escapeHTML(item.name)}" required></label>
				<label>Description / use<input name="purpose" value="${escapeHTML(item.purpose)}"></label>
				<label>Quantity<input name="quantity" type="number" min="0" step="1" value="${escapeHTML(item.quantity)}" required></label>
				<label>Unit<input name="unit" value="${escapeHTML(item.unit)}" required></label>
				<label>Price min (PHP)<input name="priceMin" type="number" min="0" step="0.01" value="${escapeHTML(item.priceMin)}" required></label>
				<label>Price max (PHP)<input name="priceMax" type="number" min="0" step="0.01" value="${escapeHTML(item.priceMax)}" required></label>
				<label class="equipment-open-ended"><input name="openEnded" type="checkbox" ${item.openEnded ? "checked" : ""}> Max price is open-ended (+)</label>
			</div>
			<div class="equipment-item-footer"><span>Estimated total / session <output data-item-total>${formatEquipmentRange(calculateEquipmentAmount(item))}</output></span><div class="form-actions"><button class="primary-button" type="submit">Save item</button><button class="table-action danger" type="button" data-delete-catalog-item="${escapeHTML(item.id)}">Delete</button></div></div>
		</form>`;
		const categoryMarkup = categories.map((category) => `<section class="portal-panel equipment-category" data-category-id="${escapeHTML(category.id)}" data-cost-group="${category.id === "core-equipment" ? "core" : "consumables"}">
			<div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(category.description)}</p><h3>${escapeHTML(category.title)}</h3></div><strong class="equipment-subtotal" data-category-total>${formatMoney(0)} - ${formatMoney(0)}</strong></div>
			<div class="equipment-item-list">${category.items.map((item) => itemForm(item, category)).join("") || "<p class=\"empty-state\">No items in this category.</p>"}</div>
		</section>`).join("");
		const categoryOptions = categories.map((category) => `<option value="${escapeHTML(category.id)}">${escapeHTML(category.title)}</option>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">SESSION COST ESTIMATES</p><h2>Equipment</h2></div><span class="demo-chip">ESTIMATED PHP</span></div>
			<p class="muted-copy">Edit item details and quantities. Totals update automatically; changes are stored in this browser when saved.</p>
			${categoryMarkup}
			<div class="section-heading equipment-consumables-heading"><div><p class="portal-kicker">Disposable / single-use items used in each dialysis session</p><h2>Hemodialysis consumables</h2></div></div>
			<section class="portal-panel"><h3>Add new item</h3><form id="equipment-add-form" class="equipment-item-form equipment-add-form">
				<div class="equipment-item-fields">
					<label>Category<select name="categoryId" required>${categoryOptions}</select></label>
					<label>Code<input name="code" placeholder="e.g. CS-14" required></label>
					<label>Item name<input name="name" required></label>
					<label>Description / use<input name="purpose"></label>
					<label>Quantity<input name="quantity" type="number" min="0" step="1" value="1" required></label>
					<label>Unit<input name="unit" value="unit" required></label>
					<label>Price min (PHP)<input name="priceMin" type="number" min="0" step="0.01" value="0" required></label>
					<label>Price max (PHP)<input name="priceMax" type="number" min="0" step="0.01" value="0" required></label>
					<label class="equipment-open-ended"><input name="openEnded" type="checkbox"> Max price is open-ended (+)</label>
				</div>
				<div class="equipment-item-footer"><span>Estimated total / session <output data-item-total>${formatMoney(0)} - ${formatMoney(0)}</output></span><button class="primary-button" type="submit">Add item</button></div>
			</form></section>
			<div class="stat-grid equipment-session-totals"><article class="stat-card"><span>CORE EQUIPMENT / SESSION</span><strong data-session-total="core">${formatMoney(0)} - ${formatMoney(0)}</strong></article><article class="stat-card"><span>CONSUMABLES / SESSION</span><strong data-session-total="consumables">${formatMoney(0)} - ${formatMoney(0)}</strong></article><article class="stat-card"><span>TOTAL ESTIMATE / SESSION</span><strong data-session-total="all">${formatMoney(0)} - ${formatMoney(0)}</strong></article></div>`;
	}

	function renderBillsTable(bills, adminView) {
		if (!bills.length) return `<p class="empty-state">No bills recorded.</p>`;
		return `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Description</th><th>Amount</th><th>Status</th><th>Payment method</th><th>Updated</th>${adminView ? "<th>Actions</th>" : ""}</tr></thead><tbody>${bills.map((bill) => `<tr><td>${escapeHTML(patientName(bill.patientId))}</td><td>${escapeHTML(bill.description)}</td><td>${formatMoney(bill.amount)}</td><td><span class="status-tag ${bill.status === "Paid" ? "success" : "pending"}">${escapeHTML(bill.status)}</span></td><td>${escapeHTML(bill.method || "Cash")}${adminView && bill.requestedMethod ? `<br><span class="status-tag pending">Request: ${escapeHTML(bill.requestedMethod)} · approval needed</span>` : ""}</td><td>${escapeHTML(bill.updatedAt || "")}</td>${adminView ? `<td>${bill.requestedMethod ? `<button class="table-action" data-approve-method="${escapeHTML(bill.id)}">Approve method</button>` : ""}<button class="table-action" data-edit-bill="${escapeHTML(bill.id)}">Edit</button><button class="table-action danger" data-delete-bill="${escapeHTML(bill.id)}">Delete</button></td>` : ""}</tr>`).join("")}</tbody></table></div>`;
	}

	function renderAdminProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">ADMIN ACCOUNT</p><h2>Profile</h2></div></div><div class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${currentUser.photo}" alt="Admin profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="admin-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Birthday<input type="date" name="birthday" value="${escapeHTML(currentUser.birthday)}"></label><label>Age<input type="number" min="0" name="age" value="${escapeHTML(currentUser.age)}"></label><label>Gender<select name="gender"><option value="">Choose</option>${["Female", "Male", "Other"].map((value) => `<option ${currentUser.gender === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Position<select name="position">${["Staff/Admin", "Doctor", "Nurse"].map((value) => `<option ${currentUser.position === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Home address<input name="address" value="${escapeHTML(currentUser.address)}"></label><label>Education background<input name="education" value="${escapeHTML(currentUser.education)}"></label><label>Employment ID / Medical staff no.<input name="employmentId" value="${escapeHTML(currentUser.employmentId)}"></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Images are stored in this browser only.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button><button class="secondary-button" type="button" data-clear-profile>Delete profile info</button></div></form></div>`;
	}

	function renderNurses(adminView) {
		const sortedAdmins = [...store.admins].sort((first, second) => first.name.localeCompare(second.name, undefined, { sensitivity: "base" }));
		return `<div class="section-heading"><div><p class="portal-kicker">CARE TEAM</p><h2>Nurses</h2></div><span class="demo-chip">${sortedAdmins.length} REGISTERED ADMINS</span></div>${adminView ? `<form id="nurse-profile-form" class="portal-panel form-grid nurse-editor"><h3 class="full-width">Your nurse listing</h3><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Profile picture<input id="nurse-photo-input" type="file" accept="image/*"><span class="field-hint">Separate from your admin profile photo; maximum 500 KB.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save listing</button></div></form>` : ""}<div class="portal-panel"><div class="nurse-directory-toolbar"><h3>Care team directory</h3><label class="nurse-search" for="nurse-search">Search nurses<input id="nurse-search" type="search" placeholder="Search by name"></label></div><ul class="nurse-grid">${sortedAdmins.map((admin) => `<li class="nurse-grid-item" data-nurse-name="${escapeHTML(admin.name.toLowerCase())}">${admin.nursePhoto ? `<button class="nurse-photo-button" type="button" data-nurse-photo="${escapeHTML(admin.nursePhoto)}" data-nurse-photo-name="${escapeHTML(admin.name)}" aria-label="View photo of ${escapeHTML(admin.name)}"><img class="nurse-avatar" src="${escapeHTML(admin.nursePhoto)}" alt=""></button>` : `<span class="nurse-avatar nurse-avatar-placeholder" aria-hidden="true">${escapeHTML(admin.name.slice(0, 1))}</span>`}<span class="nurse-name">${escapeHTML(admin.name)}</span></li>`).join("")}</ul><p id="nurse-search-empty" class="empty-state" hidden>No nurses match your search.</p></div><dialog id="nurse-photo-dialog" class="nurse-photo-dialog" aria-label="Nurse photo preview"><button class="nurse-photo-close" type="button" aria-label="Close photo preview">×</button><img id="nurse-photo-full" alt=""></dialog>`;
	}

	function dayCheckboxes(selectedDays, availableOnly = false) {
		return DAY_NAMES.filter((day) => !availableOnly || store.availableDays.includes(day)).map((day) => `<label class="day-option"><input type="checkbox" name="days" value="${day}" ${selectedDays.includes(day) ? "checked" : ""}><span>${day}</span></label>`).join("");
	}

	function renderAdminSchedule() {
		const selectedPatient = store.patients[0];
		const accessOptions = DIALYSIS_ACCESS_TYPES.map((access) => `<option value="${escapeHTML(access.id)}" ${selectedPatient?.accessSite === access.id ? "selected" : ""}>${escapeHTML(access.id)}</option>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">CENTER AVAILABILITY</p><h2>Schedule</h2></div></div><div class="portal-panel"><h3>Available dialysis days</h3><p class="muted-copy">Set the days patients can be assigned to at this center.</p><form id="availability-form"><div class="day-grid">${dayCheckboxes(store.availableDays)}</div><button class="primary-button" type="submit">Save availability</button></form></div><div class="portal-panel"><h3>Patient dialysis schedule</h3><form id="assignment-form" class="form-grid"><label>Patient<select name="patientId" id="schedule-patient-select">${patientOptions()}</select></label><label>Dialysis access<select name="accessSite" id="schedule-access-select"><option value="">Choose access type</option>${accessOptions}</select></label><div class="full-width"><span class="field-label">Assigned dialysis days</span><div id="assignment-days" class="day-grid">${dayCheckboxes(selectedPatient?.dialysisDays || [], true)}</div></div><button class="primary-button" type="submit">Save patient schedule</button></form><div class="schedule-roster">${store.patients.map((patient) => `<div class="roster-row"><strong>${escapeHTML(patient.name)}</strong><span>${escapeHTML(patient.center || "Center not set")}</span><span>${escapeHTML(patient.accessSite || "Access not set")}</span><span>${(patient.dialysisDays || []).map(escapeHTML).join(", ") || "No days assigned"}</span></div>`).join("")}</div></div>`;
	}

	function renderAdminAnnouncements() {
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT UPDATES</p><h2>Announcements</h2></div><span class="demo-chip">ADMIN POSTS · VISIBLE TO ALL PATIENTS</span></div><div class="portal-panel"><h3>Publish an announcement</h3><form id="announcement-form" class="form-grid"><label>Title<input name="title" required></label><label class="full-width">Update<textarea name="body" rows="4" required></textarea></label><button class="primary-button" type="submit">Publish announcement</button></form></div>${renderAnnouncementList(store.announcements, true)}`;
	}

	function renderAnnouncementList(announcements, adminView) {
		if (!announcements.length) return `<div class="portal-panel"><p class="empty-state">No announcements yet.</p></div>`;
		return `<div class="announcement-list">${announcements.map((announcement) => `<article class="portal-panel announcement-card"><div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(announcement.date || announcement.createdAt || "")}</p><h3>${escapeHTML(announcement.title)}</h3></div>${adminView ? `<button class="table-action danger" data-delete-announcement="${escapeHTML(announcement.id)}">Delete</button>` : ""}</div><p>${escapeHTML(announcement.body)}</p><span class="muted-copy">Posted by ${escapeHTML(announcement.author || "DIACORE Admin")}</span></article>`).join("")}</div>`;
	}

	function renderAdminReports() {
		const activityGroups = groupActivities(store.audit);
		const groupedActivity = [...activityGroups].map(([section, entries]) => `<div class="portal-panel"><h3>${getActivitySectionLabel(section)}</h3><ul class="activity-list">${entries.map((entry) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(entry.text)}</strong><small>${escapeHTML(entry.date)}</small></div></li>`).join("")}</ul></div>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">ACTIVITY LOG</p><h2>Reports</h2></div></div><div class="stat-grid"><article class="stat-card"><span>REGISTERED PATIENTS</span><strong>${store.patients.length}</strong></article><article class="stat-card"><span>UPDATES / EVENTS</span><strong>${store.audit.length}</strong></article><article class="stat-card"><span>UNREAD PATIENT NOTIFICATIONS</span><strong>${store.notifications.filter((note) => !note.read).length}</strong></article></div>${groupedActivity || `<div class="portal-panel"><p class="empty-state">No activity recorded.</p></div>`}`;
	}

	function renderMessages(adminView) {
		if (adminView && !store.patients.some((patient) => patient.id === activeMessagePatientId)) activeMessagePatientId = store.patients[0]?.id;
		const threadMessages = store.messages.filter((message) => message.patientId === activeMessagePatientId);
		return `<div class="section-heading"><div><p class="portal-kicker">CARE TEAM</p><h2>Messages</h2></div></div><div class="portal-panel message-layout">${adminView ? `<label class="message-patient-select">Choose patient<select id="message-patient-select">${patientOptions(activeMessagePatientId)}</select></label>` : ""}<div class="message-thread" id="message-thread">${threadMessages.length ? threadMessages.map((message) => `<div class="message-bubble ${message.senderRole === role ? "mine" : "theirs"}"><span>${escapeHTML(message.senderName)}</span><p>${escapeHTML(message.text)}</p><small>${escapeHTML(message.sentAt)}</small></div>`).join("") : `<p class="empty-state">No messages yet. Start a conversation with the care team.</p>`}</div><form id="message-form" class="message-compose"><label class="visually-hidden" for="message-text">Message</label><textarea id="message-text" name="text" rows="2" placeholder="Write a message" required></textarea><button class="primary-button" type="submit">Send</button></form></div>`;
	}

	function renderPatientView(view) {
		if (view === "announcements") return `<div class="section-heading"><div><p class="portal-kicker">DIACORE UPDATES</p><h2>Announcements</h2></div></div>${renderAnnouncementList(store.announcements, false)}`;
		if (view === "profile") return renderPatientProfile();
		if (view === "nurses") return renderNurses(false);
		if (view === "notes") return renderPatientNotes();
		if (view === "schedule") return renderPatientSchedule();
		if (view === "billing") return renderPatientBilling();
		if (view === "notifications") return renderPatientNotifications();
		return renderMessages(false);
	}

	function renderPatientProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR INFORMATION</p><h2>Profile</h2></div></div><div class="portal-panel"><dl class="profile-details">${[["Full name", currentUser.name], ["Email", currentUser.email], ["Birthday", currentUser.birthday], ["Age", currentUser.age], ["Gender", currentUser.gender], ["Home address", currentUser.address], ["Dialysis type", currentUser.dialysisType], ["Center", currentUser.center]].map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHTML(value || "Not provided")}</dd></div>`).join("")}</dl><p class="field-hint">Your profile only. Contact an administrator to update your personal details.</p></div>`;
	}

	function renderPatientNotes() {
		const patientNotes = store.notes.filter((note) => note.patientId === currentUser.id);
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR CARE RECORD</p><h2>Nurses notes</h2></div></div>${patientNotes.length ? `<div class="notes-list">${patientNotes.map((note) => `<article class="portal-panel note-card"><p class="portal-kicker">${escapeHTML(note.date)}</p><p>${escapeHTML(note.text)}</p></article>`).join("")}</div>` : `<div class="portal-panel"><p class="empty-state">There are no care notes for your account yet.</p></div>`}`;
	}

	function renderPatientSchedule() {
		const assignedDays = (currentUser.dialysisDays || []).filter((day) => store.availableDays.includes(day));
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR APPOINTMENTS</p><h2>Schedule</h2></div></div><section class="portal-panel patient-dialysis-info"><p class="portal-kicker">YOUR DIALYSIS INFORMATION</p><dl class="profile-details"><div><dt>Dialysis center</dt><dd>${escapeHTML(currentUser.center || "Not assigned")}</dd></div><div><dt>Access type</dt><dd>${escapeHTML(currentUser.accessSite || "Not assigned")}</dd></div><div><dt>Dialysis type</dt><dd>${escapeHTML(currentUser.dialysisType || "Not set")}</dd></div></dl><h3>Your assigned schedule</h3>${assignedDays.length ? `<div class="day-grid patient-day-grid">${assignedDays.map((day) => `<div class="day-option available selected"><span>${escapeHTML(day)}</span><strong>Dialysis session</strong></div>`).join("")}</div>` : `<p class="empty-state">Your dialysis access and schedule have not been assigned yet. Please contact your care team.</p>`}<p class="field-hint">This information is view-only and is set by your dialysis center.</p></section>`;
	}

	function renderPatientBilling() {
		const bills = store.bills.filter((bill) => bill.patientId === currentUser.id);
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR ACCOUNT</p><h2>Billing</h2></div><span class="demo-chip">DEMO · NO PAYMENT IS CHARGED</span></div>${bills.length ? `<div class="patient-bill-list">${bills.map((bill) => `<article class="portal-panel patient-bill"><div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(bill.updatedAt || "")}</p><h3>${escapeHTML(bill.description)}</h3></div><strong class="bill-amount">${formatMoney(bill.amount)}</strong></div><p>Status: <span class="status-tag ${bill.status === "Paid" ? "success" : "pending"}">${escapeHTML(bill.status)}</span></p><p>Approved method: <strong>${escapeHTML(bill.method || "Cash")}</strong></p>${bill.requestedMethod ? `<p>Requested method: <strong>${escapeHTML(bill.requestedMethod)}</strong> <span class="status-tag pending">Awaiting admin approval</span></p>` : ""}<form class="patient-payment-form" data-bill-id="${escapeHTML(bill.id)}"><label>Method of payment<select name="method">${["Cash", "BPI", "PhilHealth", "BDO"].map((value) => `<option ${ (bill.requestedMethod || bill.method || "Cash") === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><button class="secondary-button" type="submit">${bill.requestedMethod ? "Update request" : "Request approval"}</button></form><p class="field-hint">Your selection will not become active until an admin approves it. No payment is processed in this demo.</p></article>`).join("")}</div>` : `<div class="portal-panel"><p class="empty-state">No bills are assigned to your account.</p></div>`}`;
	}

	function renderPatientNotifications() {
		const ownNotifications = store.notifications.filter((note) => note.patientId === currentUser.id).map((note) => ({ ...note, section: note.section || getActivitySection(note.text) }));
		const pendingBills = store.bills.filter((bill) => bill.patientId === currentUser.id && bill.status === "Pending");
		const billNotices = pendingBills.map((bill) => ({ id: `bill-${bill.id}`, section: "billing", text: `You have a pending payment of ${formatMoney(bill.amount)} for ${bill.description}.`, date: bill.updatedAt }));
		const allNotifications = [...ownNotifications, ...billNotices];
		const notificationGroups = [...groupActivities(allNotifications)].map(([section, entries]) => `<div class="portal-panel"><h3>${getActivitySectionLabel(section)}</h3><ul class="activity-list">${entries.map((note) => `<li><span class="activity-mark ${note.read ? "read" : ""}"></span><div><strong>${escapeHTML(note.text)}</strong><small>${escapeHTML(note.date)}</small></div></li>`).join("")}</ul></div>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">ACCOUNT ACTIVITY</p><h2>Notifications</h2></div></div>${notificationGroups || `<div class="portal-panel"><p class="empty-state">You're all caught up.</p></div>`}`;
	}

	function bindViewEvents() {
		viewContainer.querySelectorAll("[data-go-view]").forEach((button) => button.addEventListener("click", () => {
			activeView = button.dataset.goView;
			renderView();
		}));

		const formHandlers = {
			"admin-profile-form": saveAdminProfile,
			"nurse-profile-form": saveNurseProfile,
			"equipment-add-form": addCatalogEquipmentItem,
			"admin-patient-form": savePatient,
			"nursing-note-form": saveNursingNote,
			"admin-bill-form": saveBill,
			"availability-form": saveAvailability,
			"assignment-form": saveAssignment,
			"announcement-form": saveAnnouncement,
			"message-form": sendMessage
		};
		Object.entries(formHandlers).forEach(([id, handler]) => {
			const form = document.querySelector(`#${id}`);
			if (form) form.addEventListener("submit", handler);
		});

		viewContainer.querySelectorAll(".equipment-item-form").forEach((form) => form.addEventListener("input", () => {
			updateEquipmentItemPreview(form);
			updateEquipmentTotals();
		}));
		viewContainer.querySelectorAll(".equipment-item-form:not(#equipment-add-form)").forEach((form) => form.addEventListener("submit", saveCatalogEquipmentItem));
		viewContainer.querySelectorAll("[data-delete-catalog-item]").forEach((button) => button.addEventListener("click", () => deleteCatalogEquipmentItem(button.dataset.deleteCatalogItem)));
		updateEquipmentTotals();

		viewContainer.querySelectorAll(".patient-payment-form").forEach((form) => form.addEventListener("submit", savePaymentMethod));
		viewContainer.querySelectorAll(".equipment-edit-form").forEach((form) => form.addEventListener("submit", saveEquipmentItem));
		viewContainer.querySelectorAll(".equipment-use-form").forEach((form) => {
			form.addEventListener("input", updateEquipmentUsageCost);
			form.addEventListener("submit", recordEquipmentUsage);
		});
		viewContainer.querySelectorAll(".equipment-restock-form").forEach((form) => form.addEventListener("submit", restockEquipment));
		viewContainer.querySelectorAll("[data-delete-equipment]").forEach((button) => button.addEventListener("click", () => deleteEquipmentItem(button.dataset.deleteEquipment)));
		viewContainer.querySelectorAll("[data-edit-patient]").forEach((button) => button.addEventListener("click", () => {
			const patient = store.patients.find((entry) => entry.id === button.dataset.editPatient);
			viewContainer.innerHTML = renderAdminPatients(patient);
			bindViewEvents();
		}));
		viewContainer.querySelectorAll("[data-delete-patient]").forEach((button) => button.addEventListener("click", () => deletePatient(button.dataset.deletePatient)));
		viewContainer.querySelectorAll("[data-cancel-patient-edit]").forEach((button) => button.addEventListener("click", renderView));
		viewContainer.querySelectorAll("[data-edit-bill]").forEach((button) => button.addEventListener("click", () => {
			const bill = store.bills.find((entry) => entry.id === button.dataset.editBill);
			viewContainer.innerHTML = renderAdminBilling(bill);
			bindViewEvents();
		}));
		viewContainer.querySelectorAll("[data-delete-bill]").forEach((button) => button.addEventListener("click", () => deleteBill(button.dataset.deleteBill)));
		viewContainer.querySelectorAll("[data-approve-method]").forEach((button) => button.addEventListener("click", () => approvePaymentMethod(button.dataset.approveMethod)));
		viewContainer.querySelectorAll("[data-cancel-bill-edit]").forEach((button) => button.addEventListener("click", renderView));
		viewContainer.querySelectorAll("[data-delete-announcement]").forEach((button) => button.addEventListener("click", () => deleteAnnouncement(button.dataset.deleteAnnouncement)));
		viewContainer.querySelectorAll("[data-edit-note]").forEach((button) => button.addEventListener("click", () => {
			activeEditingNoteId = button.dataset.editNote;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-cancel-note-edit]").forEach((button) => button.addEventListener("click", () => {
			activeEditingNoteId = "";
			renderView();
		}));
		const notePatientSelect = document.querySelector("#note-patient-select");
		if (notePatientSelect) notePatientSelect.addEventListener("change", () => {
			activeNotePatientId = notePatientSelect.value;
			activeEditingNoteId = "";
			renderView();
		});

		const patientSelect = document.querySelector("#schedule-patient-select");
		if (patientSelect) patientSelect.addEventListener("change", () => {
			const patient = store.patients.find((entry) => entry.id === patientSelect.value);
			document.querySelector("#assignment-days").innerHTML = dayCheckboxes(patient?.dialysisDays || [], true);
			document.querySelector("#schedule-access-select").value = patient?.accessSite || "";
		});
		const messagePatientSelect = document.querySelector("#message-patient-select");
		if (messagePatientSelect) messagePatientSelect.addEventListener("change", () => {
			activeMessagePatientId = messagePatientSelect.value;
			renderView();
		});
		const photoInput = document.querySelector("#profile-photo-input");
		if (photoInput) photoInput.addEventListener("change", readProfilePhoto);
		const nursePhotoInput = document.querySelector("#nurse-photo-input");
		if (nursePhotoInput) nursePhotoInput.addEventListener("change", readNursePhoto);
		const nurseSearch = document.querySelector("#nurse-search");
		if (nurseSearch) nurseSearch.addEventListener("input", filterNurses);
		const nursePhotoDialog = document.querySelector("#nurse-photo-dialog");
		if (nursePhotoDialog) {
			viewContainer.querySelectorAll("[data-nurse-photo]").forEach((button) => button.addEventListener("click", () => {
				const fullPhoto = nursePhotoDialog.querySelector("#nurse-photo-full");
				fullPhoto.src = button.dataset.nursePhoto;
				fullPhoto.alt = `Photo of ${button.dataset.nursePhotoName}`;
				nursePhotoDialog.showModal();
			}));
			nursePhotoDialog.querySelector(".nurse-photo-close").addEventListener("click", () => nursePhotoDialog.close());
			nursePhotoDialog.addEventListener("click", (event) => {
				if (event.target === nursePhotoDialog) nursePhotoDialog.close();
			});
		}
		const clearProfileButton = document.querySelector("[data-clear-profile]");
		if (clearProfileButton) clearProfileButton.addEventListener("click", clearAdminProfile);
	}

	function readProfilePhoto(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > 500000) {
			window.alert("Please choose a profile image smaller than 500 KB.");
			event.target.value = "";
			return;
		}
		const reader = new FileReader();
		reader.addEventListener("load", () => { profilePhotoDraft = String(reader.result); });
		reader.readAsDataURL(file);
	}

	function saveAdminProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		Object.assign(currentUser, data, { photo: profilePhotoDraft });
		addAudit(store, `Admin profile updated: ${currentUser.name}`);
		saveStore(store);
		renderView();
	}

	function readNursePhoto(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > 500000) {
			window.alert("Please choose a profile image smaller than 500 KB.");
			event.target.value = "";
			return;
		}
		const reader = new FileReader();
		reader.addEventListener("load", () => { nursePhotoDraft = String(reader.result); });
		reader.readAsDataURL(file);
	}

	function saveNurseProfile(event) {
		event.preventDefault();
		if (role !== "admin") return;
		const name = String(new FormData(event.currentTarget).get("name") || "").trim();
		if (!name) return;
		Object.assign(currentUser, { name, nursePhoto: nursePhotoDraft });
		addAudit(store, `Nurse directory listing updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function getEquipmentFormValues(form) {
		const data = Object.fromEntries(new FormData(form));
		return {
			code: String(data.code || "").trim(),
			name: String(data.name || "").trim(),
			purpose: String(data.purpose || "").trim(),
			quantity: Number(data.quantity),
			unit: String(data.unit || "").trim(),
			priceMin: Number(data.priceMin),
			priceMax: Number(data.priceMax),
			openEnded: data.openEnded === "on"
		};
	}

	function validateEquipmentForm(form, values, itemId = "") {
		if (!values.code || !values.name || !values.unit || !Number.isInteger(values.quantity) || values.quantity < 0 || !Number.isFinite(values.priceMin) || !Number.isFinite(values.priceMax) || values.priceMin < 0 || values.priceMax < values.priceMin) {
			window.alert("Check the item code, name, quantity, and price range.");
			return false;
		}
		const duplicateCode = store.equipmentCatalog.some((category) => category.items.some((item) => item.id !== itemId && item.code.toLowerCase() === values.code.toLowerCase()));
		if (duplicateCode) {
			window.alert("That item code is already in use.");
			return false;
		}
		return true;
	}

	function updateEquipmentItemPreview(form) {
		const output = form.querySelector("[data-item-total]");
		if (!output) return;
		output.textContent = formatEquipmentRange(calculateEquipmentAmount(getEquipmentFormValues(form)));
	}

	function updateEquipmentTotals() {
		const coreTotalOutput = viewContainer.querySelector('[data-session-total="core"]');
		const consumablesTotalOutput = viewContainer.querySelector('[data-session-total="consumables"]');
		const allTotalOutput = viewContainer.querySelector('[data-session-total="all"]');
		if (!coreTotalOutput || !consumablesTotalOutput || !allTotalOutput) return;

		const categoryTotals = new Map();
		const groupTotals = {
			core: { minimum: 0, maximum: 0, openEnded: false },
			consumables: { minimum: 0, maximum: 0, openEnded: false }
		};
		viewContainer.querySelectorAll(".equipment-item-form:not(#equipment-add-form)").forEach((form) => {
			const amount = calculateEquipmentAmount(getEquipmentFormValues(form));
			const categoryId = form.dataset.categoryId;
			const group = form.dataset.costGroup;
			if (!categoryTotals.has(categoryId)) categoryTotals.set(categoryId, { minimum: 0, maximum: 0, openEnded: false });
			[categoryTotals.get(categoryId), groupTotals[group]].forEach((totals) => {
				totals.minimum += amount.minimum;
				totals.maximum += amount.maximum;
				totals.openEnded ||= amount.openEnded;
			});
		});
		viewContainer.querySelectorAll(".equipment-category").forEach((category) => {
			const totals = categoryTotals.get(category.dataset.categoryId) || { minimum: 0, maximum: 0, openEnded: false };
			category.querySelector("[data-category-total]").textContent = formatEquipmentRange(totals);
		});
		const allTotals = {
			minimum: groupTotals.core.minimum + groupTotals.consumables.minimum,
			maximum: groupTotals.core.maximum + groupTotals.consumables.maximum,
			openEnded: groupTotals.core.openEnded || groupTotals.consumables.openEnded
		};
		coreTotalOutput.textContent = formatEquipmentRange(groupTotals.core);
		consumablesTotalOutput.textContent = formatEquipmentRange(groupTotals.consumables);
		allTotalOutput.textContent = formatEquipmentRange(allTotals);
	}

	function addCatalogEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const values = getEquipmentFormValues(form);
		if (!validateEquipmentForm(form, values)) return;
		const category = store.equipmentCatalog.find((entry) => entry.id === form.elements.categoryId.value);
		if (!category) return;
		category.items.unshift({ id: makeId("equipment-item"), ...values });
		addAudit(store, `Equipment catalog item added: ${values.code} ${values.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function saveCatalogEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const itemId = form.dataset.itemId;
		const values = getEquipmentFormValues(form);
		if (!validateEquipmentForm(form, values, itemId)) return;
		const category = store.equipmentCatalog.find((entry) => entry.id === form.dataset.categoryId);
		const item = category?.items.find((entry) => entry.id === itemId);
		if (!item) return;
		Object.assign(item, values);
		addAudit(store, `Equipment catalog item updated: ${values.code} ${values.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function deleteCatalogEquipmentItem(itemId) {
		const category = store.equipmentCatalog.find((entry) => entry.items.some((item) => item.id === itemId));
		const item = category?.items.find((entry) => entry.id === itemId);
		if (!category || !item || !window.confirm(`Delete ${item.code} ${item.name} from the catalog?`)) return;
		category.items = category.items.filter((entry) => entry.id !== itemId);
		addAudit(store, `Equipment catalog item deleted: ${item.code} ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function saveEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		if (!item) return;
		const data = Object.fromEntries(new FormData(form));
		const name = String(data.name || "").trim();
		const unitPrice = Number(data.unitPrice);
		if (!name || !Number.isFinite(unitPrice) || unitPrice < 0) return;
		Object.assign(item, { name, unitPrice });
		addAudit(store, `Equipment item updated: ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function updateEquipmentUsageCost(event) {
		const form = event.currentTarget;
		const quantity = Math.max(0, Number(new FormData(form).get("quantity")) || 0);
		const output = form.querySelector("output");
		output.textContent = formatMoney(quantity * Number(output.dataset.unitPrice));
	}

	function recordEquipmentUsage(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		const quantity = Number(new FormData(form).get("quantity"));
		if (!item || !Number.isInteger(quantity) || quantity <= 0) return;
		if (quantity > item.stock) {
			window.alert(`Only ${item.stock} units of ${item.name} are in stock.`);
			return;
		}
		const cost = quantity * item.unitPrice;
		item.stock -= quantity;
		item.usedQuantity += quantity;
		item.usedCost += cost;
		addAudit(store, `Equipment used: ${quantity} ${item.name} (${formatMoney(cost)})`, "equipment");
		saveStore(store);
		renderView();
	}

	function restockEquipment(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		const quantity = Number(new FormData(form).get("quantity"));
		if (!item || !Number.isInteger(quantity) || quantity <= 0) return;
		item.stock += quantity;
		addAudit(store, `Equipment restocked: ${quantity} ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function deleteEquipmentItem(itemId) {
		const item = store.equipment.find((entry) => entry.id === itemId);
		if (!item || !window.confirm(`Delete ${item.name} from inventory?`)) return;
		store.equipment = store.equipment.filter((entry) => entry.id !== itemId);
		addAudit(store, `Equipment item deleted: ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function filterNurses(event) {
		const query = event.currentTarget.value.trim().toLowerCase();
		const nurseItems = [...viewContainer.querySelectorAll(".nurse-grid-item")];
		let visibleCount = 0;
		nurseItems.forEach((item) => {
			const matches = item.dataset.nurseName.includes(query);
			item.hidden = !matches;
			if (matches) visibleCount += 1;
		});
		document.querySelector("#nurse-search-empty").hidden = visibleCount > 0;
	}

	function clearAdminProfile() {
		Object.assign(currentUser, { name: currentUser.username, birthday: "", age: "", gender: "", position: "Admin", address: "", education: "", employmentId: "", photo: "" });
		profilePhotoDraft = "";
		addAudit(store, `Admin profile cleared: ${currentUser.username}`);
		saveStore(store);
		renderView();
	}

	function savePatient(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const existing = store.patients.find((patient) => patient.id === data.patientId);
		if (existing) {
			Object.assign(existing, data);
			addAudit(store, `Patient information updated: ${existing.name}`);
			addNotification(store, existing.id, "Your profile information was updated by DIACORE.", "profile");
		} else {
			const patient = { ...data, id: makeId("patient"), password: "", dialysisDays: [], registeredAt: new Date().toISOString().slice(0, 10) };
			store.patients.push(patient);
			addAudit(store, `Patient record added: ${patient.name}`);
		}
		saveStore(store);
		renderView();
	}

	function saveNursingNote(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const text = String(formData.get("text") || "").trim();
		const patient = store.patients.find((entry) => entry.id === activeNotePatientId);
		if (!patient || !text) return;
		const noteId = String(formData.get("noteId") || "");
		const existingNote = store.notes.find((note) => note.id === noteId && note.patientId === patient.id);
		if (existingNote) {
			Object.assign(existingNote, { text, date: new Date().toISOString().slice(0, 10) });
			addAudit(store, `Nursing note updated for ${patient.name}`);
		} else {
			store.notes.unshift({ id: makeId("note"), patientId: patient.id, date: new Date().toISOString().slice(0, 10), text });
			addAudit(store, `Nursing note added for ${patient.name}`);
		}
		activeEditingNoteId = "";
		saveStore(store);
		renderView();
	}

	function deletePatient(patientId) {
		const patient = store.patients.find((entry) => entry.id === patientId);
		if (!patient || !window.confirm(`Delete ${patient.name} and their demo records?`)) return;
		store.patients = store.patients.filter((entry) => entry.id !== patientId);
		store.notes = store.notes.filter((entry) => entry.patientId !== patientId);
		store.bills = store.bills.filter((entry) => entry.patientId !== patientId);
		store.messages = store.messages.filter((entry) => entry.patientId !== patientId);
		store.notifications = store.notifications.filter((entry) => entry.patientId !== patientId);
		addAudit(store, `Patient record deleted: ${patient.name}`);
		saveStore(store);
		renderView();
	}

	function saveBill(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const existing = store.bills.find((bill) => bill.id === data.billId);
		const billData = { patientId: data.patientId, description: data.description, amount: Number(data.amount), status: data.status, method: data.method, updatedAt: new Date().toISOString().slice(0, 10) };
		if (existing) Object.assign(existing, billData);
		else store.bills.unshift({ ...billData, id: makeId("bill") });
		const patient = store.patients.find((entry) => entry.id === data.patientId);
		addNotification(store, data.patientId, `Your bill was updated by DIACORE: ${formatMoney(data.amount)} (${data.status}).`);
		addAudit(store, `Bill updated for ${patient?.name || "patient"}`);
		saveStore(store);
		renderView();
	}

	function deleteBill(billId) {
		const bill = store.bills.find((entry) => entry.id === billId);
		if (!bill || !window.confirm("Delete this bill?")) return;
		store.bills = store.bills.filter((entry) => entry.id !== billId);
		addNotification(store, bill.patientId, `A bill for ${bill.description} was removed from your account.`);
		addAudit(store, `Bill deleted for ${patientName(bill.patientId)}`);
		saveStore(store);
		renderView();
	}

	function approvePaymentMethod(billId) {
		const bill = store.bills.find((entry) => entry.id === billId && entry.requestedMethod);
		if (!bill) return;
		bill.method = bill.requestedMethod;
		delete bill.requestedMethod;
		bill.updatedAt = new Date().toISOString().slice(0, 10);
		addNotification(store, bill.patientId, `Your payment method request for ${bill.description} was approved: ${bill.method}.`);
		addAudit(store, `Payment method ${bill.method} approved for ${patientName(bill.patientId)}`);
		saveStore(store);
		renderView();
	}

	function saveAvailability(event) {
		event.preventDefault();
		store.availableDays = new FormData(event.currentTarget).getAll("days");
		addAudit(store, `Available schedule updated: ${store.availableDays.join(", ") || "no days"}`);
		store.patients.forEach((patient) => {
			patient.dialysisDays = (patient.dialysisDays || []).filter((day) => store.availableDays.includes(day));
		});
		saveStore(store);
		renderView();
	}

	function saveAssignment(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === formData.get("patientId"));
		if (!patient) return;
		patient.accessSite = String(formData.get("accessSite") || "");
		patient.dialysisDays = formData.getAll("days").filter((day) => store.availableDays.includes(day));
		addNotification(store, patient.id, `Your dialysis access and schedule were updated: ${patient.accessSite || "access not set"}; ${patient.dialysisDays.join(", ") || "no days assigned"}.`, "schedule");
		addAudit(store, `Dialysis access and schedule updated for ${patient.name}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveAnnouncement(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const announcement = { id: makeId("announcement"), title: data.title, body: data.body, createdAt: new Date().toISOString().slice(0, 10), author: currentUser.name };
		store.announcements.unshift(announcement);
		store.patients.forEach((patient) => addNotification(store, patient.id, `New announcement: ${announcement.title}`));
		addAudit(store, `Announcement posted: ${announcement.title}`);
		saveStore(store);
		renderView();
	}

	function deleteAnnouncement(announcementId) {
		const announcement = store.announcements.find((entry) => entry.id === announcementId);
		if (!announcement || !window.confirm("Delete this announcement?")) return;
		store.announcements = store.announcements.filter((entry) => entry.id !== announcementId);
		addAudit(store, `Announcement deleted: ${announcement.title}`);
		saveStore(store);
		renderView();
	}

	function sendMessage(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const text = String(formData.get("text")).trim();
		if (!text || !activeMessagePatientId) return;
		store.messages.push({ id: makeId("message"), patientId: activeMessagePatientId, senderId: currentUser.id, senderRole: role, senderName: currentUser.name, text, sentAt: new Date().toLocaleString() });
		if (role === "admin") addNotification(store, activeMessagePatientId, `New message from ${currentUser.name}.`);
		addAudit(store, `Message sent ${role === "admin" ? `to ${patientName(activeMessagePatientId)}` : `by ${currentUser.name}`}`);
		saveStore(store);
		renderView();
	}

	function savePaymentMethod(event) {
		event.preventDefault();
		const billId = event.currentTarget.dataset.billId;
		const bill = store.bills.find((entry) => entry.id === billId && entry.patientId === currentUser.id);
		if (!bill) return;
		const method = new FormData(event.currentTarget).get("method");
		bill.requestedMethod = method;
		bill.paymentMethodRequestedAt = new Date().toISOString().slice(0, 10);
		addNotification(store, currentUser.id, `Your request to use ${method} for ${bill.description} was sent to the admin for approval. No payment was processed.`);
		addAudit(store, `Payment method ${method} requested by ${currentUser.name}`);
		saveStore(store);
		renderView();
	}

	renderView();
}
