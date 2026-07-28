//@ts-ignore
expect(20 + 30).toBe(50); // ✅ يمر بنجاح
//@ts-ignore
expect("عيادة يُسر").toBe("عيادة يُسر"); // ✅ يمر بنجاح

const patient1 = { id: "P-101", name: "أحمد" };
const patient2 = { id: "P-101", name: "أحمد" };

//@ts-ignore
// ❌ ينفجر التيرمنال باللون الأحمر ويقول: Failed!
expect(patient1).toBe(patient2);

// @ts-ignore
// ✅ يمر بنجاح ساحق لأنه يقارن المحتوى الداخلي للكائنين!
expect(patient1).toEqual(patient2);
