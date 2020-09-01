import React from "react";
import { AsyncStorage } from "react-native";
import { DATA_STORAGE_KEY, NOTIFICATION_KEY } from './keys'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

export async function getDecksData () {
// get all the data about the decks 
	try {
		const result = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
		return result
	} 
	catch(error){
		console.log('Error', error)
	}
}

export async function deleteDeck(id) {
// delete the deck corresponding to the id received in the function
	try {
		const result = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
		delete result[id]
		await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(result))
	} 
	catch(error){
		console.log('Error', error)
	}
}

export async function getDeck (id) {
// Return the deck corresponding to the id
	try {
		getDecksData()
			.then(decks =>{
				return decks[id]
			})
	} 
	catch(error){
		console.log('error', error)
	}
	
}

export const addDeck = async(title) => {
// Add the deck title to the deck and create a container	
	try {
		const newDeck = JSON.stringify({
				[title]: {
					title,
					questions: [],
				}
			})
		await AsyncStorage.mergeItem(DATA_STORAGE_KEY, newDeck)

		return JSON.parse(newDeck)
	} catch (error) {
		console.warn(error.message)
	}
}

export const addCardToDeck = async(title, card) => {
//  Add the card to the deck with the associated title.
	try {
		const result = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
		const currentDeck = result[title]
		currentDeck.questions.push(card)
		const updatedDeck = {[title]: currentDeck}

		return await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(updatedDeck))
		
	} catch (error) {
		console.warn(error.message)
	}
} 

function createNotification () {
	return {
		title: 'Start a quiz',
		body: "Learn by quizzing",
		ios: {
	      sound: true,
	    },
	    android: {
	      sound: true,
	      priority: 'high',
	      sticky: false,
	      vibrate: true,
	    }
	}
}

export function	setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data)=> {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
				.then(({ status })=> {
					if (status ==='granted') {
						Notifications.cancelAllScheduledNotificationsAsync()
						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate() + 1)
						tomorrow.setHours(21)
						tomorrow.setMinutes(0)

						Notifications.scheduleLocalNotificationAsync(
							createNotification(), 
							{
								time: tomorrow,
								repeat: 'day',
							}
						)

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}
				})
			}
		})
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}