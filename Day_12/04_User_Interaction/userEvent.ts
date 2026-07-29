//@ts-ignore
// كتابة اسم المريض حرفاً حرفاً في الحقل:
await user.type(nameInput, "أحمد محمود");

//@ts-ignore
// مسح الحقل بالكامل (مثل تظليله وضغط Backspace):
await user.clear(nameInput);

//@ts-ignore
// محاكاة الضغط على زر Tab للانتقال للحقل التالي، ثم كتابة رقم، ثم الضغط على Enter:
await user.keyboard('[Tab]07901234567[Enter]');

//@ts-ignore
// محاكاة الضغط على زر Escape لإغلاق نافذة:
await user.keyboard('[Escape]');

//@ts-ignore
// اختيار ماركة العدسة من قائمة <select>:
await user.selectOptions(lensSelectBox, "RAYBAN_2026");

//@ts-ignore
// تمرير الماوس فوق بطاقة السعر لإظهار زر الخصم المخفي:
await user.hover(priceCard);