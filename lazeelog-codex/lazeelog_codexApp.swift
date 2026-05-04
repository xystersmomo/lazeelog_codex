//
//  lazeelog_codexApp.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//

import SwiftUI

@main
struct LazeeLogApp: App {
    var body: some Scene {
        WindowGroup {
            TimerScreen(viewModel: TimerViewModel())
        }
    }
}
