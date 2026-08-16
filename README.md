# Gaza Hope — الموقع الكامل

موقع متعدد الصفحات، مركزي، مستقل عن السوشال ميديا. ملفات ثابتة بالكامل (Static Site) — بدون سيرفر خلفي أو قاعدة بيانات، فقط ملفات JSON بسيطة تديرها بسكربتات بايثون.

## الصفحات (٦)

| الصفحة | الوظيفة |
|---|---|
| `index.html` | الرئيسية — القصة + الأرقام الحية + التبرع المباشر |
| `about.html` | من نحن |
| `activities.html` | الأنشطة والفيديوهات (تُقرأ من `activities.json`) |
| `transparency.html` | الشفافية — المحفظة، رابط التحقق من البلوك تشين، الأرقام |
| `updates.html` | آخر التحديثات (تُقرأ من `updates.json`) |
| `contact.html` | تواصل معنا |

## الملفات المشتركة
- `style.css` — كل تنسيقات الموقع
- `main.js` — كل منطق الموقع (لغة، أرقام حية، تحديثات، أنشطة، نسخ، مشاركة)

## سكربتات الإدارة (٣) — كلها بايثون، بدون تعقيد

### 1) `update_stats.py` — الأرقام الحية
```bash
python3 update_stats.py --beds 5 --meals 15 --families 5
python3 update_stats.py --auto-raised   # يسحب المبلغ فعلياً من البلوك تشين
```

### 2) `add_update.py` — آخر التحديثات
```bash
python3 add_update.py --title-ar "..." --body-ar "..." --image "updates/photo.jpg"
python3 add_update.py --list
python3 add_update.py --delete 2
```

### 3) `add_activity.py` — الأنشطة والفيديوهات
```bash
# فيديو (يوتيوب فقط — لا نستضيف ملفات فيديو خام)
python3 add_activity.py --type video --title-ar "..." --youtube-id "dQw4w9WgXcQ"

# صورة
python3 add_activity.py --type photo --title-ar "..." --image "activities/photo.jpg"

python3 add_activity.py --list
python3 add_activity.py --delete 2
```

## كيف تشغّل الموقع محلياً للاختبار

الصفحات تعتمد على `fetch()` لقراءة ملفات JSON، وهذا لا يعمل من `file://`. شغّل سيرفر بسيط:

```bash
python3 -m http.server 8000
```

وافتح `http://localhost:8000`.

## جدولة تلقائية (Cron) — لتحديث الأرقام كل 6 ساعات

```
0 */6 * * * cd /path/to/gaza-hope && /usr/bin/python3 update_stats.py --auto-raised >> update_stats.log 2>&1
```

## ⚠️ قبل الرفع الفعلي — راجع هذي النقاط

1. **البريد الإلكتروني** بصفحة التواصل (`contact.html`) حالياً placeholder — استبدله ببريد حقيقي أو احذفه.
2. **روابط الدومين** بملفات `sitemap.xml`, `robots.txt`, و Open Graph tags — عدّلها لو نقلت لدومين خاص.
3. **صور ومحتوى حقيقي** — كل الصفحات جاهزة تقنياً، لكن المصداقية الفعلية تحتاج محتوى حقيقي موثق (صور، فيديوهات).
4. **مجلدي `updates/` و`activities/`** فاضيين وجاهزين لصورك.
