import {fetchData, fetchData2} from './05-async';

/*
// 【1】callback 中处理，需要手动结束 done，否则可能走不到 callback
test('fetchData 返回结果为 { success: true }', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true
        });
        // 不写，当接口404会导致用例不执行
        done();
    })
})

// 【2】得到 promise，处理成功，需要指定返回expect数量，否则可能直接走失败跳过
test('fetchData2 返回结果为 { success: true }', () => {
    // 指定执行返回的 expect 数量
    expect.assertions(1);
    return fetchData2().then((response) => {
        expect(response.data).toEqual({
            success: true
        });
    })
})
*/

// 【3】得到 promise，处理失败，需要指定返回expect数量，否则可能直接走成功跳过
test('fetchData2 返回结果为 404', () => {
    // 当接口不为404，则不会走catch
    // 指定执行返回的 expect 数量
    expect.assertions(1);
    return fetchData2().catch((e) => {
        // console.log(e.toString());
        expect(e.toString().indexOf('404') > -1).toBe(true);
    })
})

/**
 * promise 处理
 * resolves / rejects / async|await
 */
/*
// 【4】promise-resolves 处理方式
test('fetchData2 返回结果为 { success: true }', () => {
    return expect(fetchData2()).resolves.toMatchObject({
        data: {
            success: true
        }
    });
})
*/
// 【4】promise-rejects 处理方式
test('fetchData2 返回结果为 404', () => {
    return expect(fetchData2()).rejects.toThrow();
})

/*
// 【5】promise-async|await 成功处理方式1
test('fetchData2 返回结果为 { success: true }', async () => {
    await expect(fetchData2()).resolves.toMatchObject({
        data: {
            success: true
        }
    });
})
// 【6】promise-async|await 成功处理方式2
test('fetchData2 返回结果为 { success: true }', async () => {
    const response = await fetchData2();
    expect(response.data).toEqual({
        success: true
    });
})
*/
// 【7】promise-async|await 失败处理方式1
test('fetchData2 返回结果为 404', async () => {
    await expect(fetchData2()).rejects.toThrow();
})

// 【8】promise-async|await 失败处理方式2
test('fetchData2 返回结果为 404', async () => {
    expect.assertions(1);
    try {
        await fetchData2();
    } catch (e) {
        // console.log(e.toString())
        expect(e.toString().indexOf('404') > -1).toBe(true);
    }
})
