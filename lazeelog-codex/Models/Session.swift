//
//  Session.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import Foundation

struct Session: Identifiable {
    let id: UUID
    let categoryId: String
    let label: String
    let startedAt: Date
    let endedAt: Date

    var durationSec: Int {
        Int(endedAt.timeIntervalSince(startedAt))
    }
}