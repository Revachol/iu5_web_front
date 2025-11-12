import { mockHistoricalObjects } from "./mockData"

export interface HistoricalObject {
    ID: number
    Name: string
    Description: string
    PriceUSD: number
    Unit: string
    HistoricalPeriod: string
    HistoricalRegion: string
    DataSource: string
    ImageURL: string
    IsActive: boolean
    CreatedAt: string
}

export interface HOFilters {
    name?: string
}

export interface CartDraft {
    id: number
    amount_of_orders: number
}

const API_BASE_URL = '/api'

export const getHistoricalObjects = async (filters: HOFilters = {}): Promise<HistoricalObject[]> => {
    try {
        const queryParams = new URLSearchParams()
        if (filters.name) {
            queryParams.append('name', filters.name)
        }
        const response = await fetch(`${API_BASE_URL}/historical_objects?${queryParams}`)
        
        if (!response.ok) {
        throw new Error('Network response was not ok')
        }
        return await response.json()
    } catch (error) {
        console.warn('API request failed, using mock data:', error)
        return getMockHistoricalObjects(filters)
    }
}

export const getHistoricalObjectById = async (id: number): Promise<HistoricalObject> => {
    try {
        const response = await fetch(`${API_BASE_URL}/historical_object/${id}`)
        
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        
        return await response.json()
    } catch (error) {
        console.warn('API request failed, using mock data:', error)
        const mockTariffs = getMockHistoricalObjects()
        const hobject = mockTariffs.find(t => t.ID === id)
        if (!hobject) throw new Error('Tariff not found')
        return hobject
    }
}

const getMockHistoricalObjects = (filters: HOFilters = {}): HistoricalObject[] => {
    let filteredHistoricalObjects = mockHistoricalObjects

    if (filters.name) {
        filteredHistoricalObjects = filteredHistoricalObjects.filter(tariff =>
        tariff.Name.toLowerCase().includes(filters.name!.toLowerCase())
        )
    }
    return filteredHistoricalObjects
}


export const getCartDraft = async (): Promise<CartDraft> => {
    const response = await fetch(`${API_BASE_URL}/chargingApplications/draft`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // или твой способ авторизации
            'Content-Type': 'application/json'
        }
    })  
    if (!response.ok) {
        throw new Error('Ошибка при загрузке корзины')
    } 
    return response.json()
}