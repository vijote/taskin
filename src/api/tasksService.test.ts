// Testing utilities
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';

// Service
import { HTTPLib } from './api.service';
import TasksService from './tasks.service';

describe('TasksService', async () => {
    let taskService: TasksService

    const mockedRequest = vi.fn()
    const mockedOnRequest = vi.fn()
    const mockedId = "test"

    const mockedLib: HTTPLib = {
        request: mockedRequest
    }

    beforeAll(() => {
        taskService = new TasksService(mockedLib, mockedId, mockedOnRequest)
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('any request calls HTTPLib request', async () => {
        mockedRequest.mockReturnValueOnce({ data: {} })

        await taskService.create("test", "test")

        expect(mockedRequest).toHaveBeenCalled();
    });

    it('any request sends received user id via headers', async () => {
        mockedRequest.mockReturnValueOnce({ data: {} })

        await taskService.create("test", "test")

        const receivedParams = mockedRequest.mock.calls[0][0]
        expect(receivedParams.headers["user-id"]).toBe(mockedId);
    });

    it('any request calls onRequest', async () => {
        mockedRequest.mockReturnValueOnce({ data: {} })

        await taskService.create("test", "test")

        expect(mockedOnRequest).toHaveBeenCalledOnce()
    });
});