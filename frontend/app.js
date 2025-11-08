// دالة لعرض المشاريع
function showProjects() {
    document.getElementById('projects').style.display = 'block';
    
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = `
        <div class="project">
            <h3>🌐 موقع DevSahara نفسه</h3>
            <p>هذا المشروع الذي نعمل عليه الآن!</p>
            <button onclick="contributeToProject('devsahara')">المساهمة</button>
        </div>
        <div class="project">
            <h3>📚 مكتبة أدوات عربية</h3>
            <p>مكتبة أدوات برمجية للغة العربية</p>
            <button onclick="contributeToProject('arabic-tools')">المساهمة</button>
        </div>
    `;
}

// دالة المحاكاة للمساهمة
function contributeToProject(projectName) {
    alert(`🚀 تهانينا! أنت على وشك المساهمة في مشروع ${projectName}\n\nالخطوة التالية: سأنشئ لك نموذج طلب pull request`);
}

// إظهار رسالة ترحيبية
console.log('🌍 مرحباً بك في DevSahara!');
