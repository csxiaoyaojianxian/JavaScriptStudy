
test('jest匹配器', () => {
    const a = { one: 1 };
    const b = null;
    const c = 0.1;
    const d = 0.2;
    const e = 'www.csxiaoyao.com';
    const f = ['www', 'csxiaoyao', 'com'];
    const g = new Set(f);
    const h = () => {
        throw new Error('this is a new error');
    };
    // 【 toBe 】 匹配器
    // expect(a).toBe({ one: 1 }); // false 地址不同
    // 【 toEqual 】 匹配器
    expect(a).toEqual({ one: 1 });

    // 【 toBeNull 】【 toBeUndefined 】【 toBeDefined 】【 toBeTruthy 】【 toBeFalsy 】
    expect(b).toBeNull();

    // 【 not 】
    expect(c).not.toBeFalsy();

    // Number【 toBeCloseTo 】【 toBeGreaterThan 】【 toBeLessThan 】【 toBeGreaterThanOrEqual 】【 toBeLessThanOrEqual 】
    expect(10).toBeGreaterThan(9);
    expect(10).toBeGreaterThanOrEqual(10);
    expect(c + d).toBeCloseTo(0.3);

    // String【 toMatch 】
    expect(e).toMatch('csxiaoyao');

    // Array/Set 【 toContain 】
    expect(f).toContain('csxiaoyao');
    expect(g).toContain('csxiaoyao');
    
    // 异常 【 toThrow 】
    expect(h).toThrow();
    expect(h).toThrow('this is a new error');
    expect(h).toThrow(/this is a new error/);
    // expect(h).not.toThrow();

    // ...
})
