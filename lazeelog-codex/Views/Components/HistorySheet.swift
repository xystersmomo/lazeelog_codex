//
//  HistorySheet.swift
//  lazeelog-codex
//
//  Created by xystersmac on 5/3/26.
//


import SwiftUI

struct HistorySheet: View {
    let sessions: [Session]

    var totalSec: Int { sessions.reduce(0) { $0 + $1.durationSec } }

    var body: some View {
        VStack(spacing: 16) {
            Capsule()
                .fill(Color.white.opacity(0.3))
                .frame(width: 50, height: 6)
                .padding(.top, 8)

            HStack {
                Text("Today")
                    .font(.system(size: 22, weight: .bold))
                    .foregroundStyle(Theme.Colors.text)

                Spacer()

                Text("\(sessions.count) sessions · \(format(totalSec))")
                    .foregroundStyle(Theme.Colors.textDim)
                    .font(.system(size: 12, weight: .medium))
            }

            ForEach(sessions.prefix(6)) { s in
                HStack {
                    Text(s.label)
                        .foregroundStyle(Theme.Colors.text)

                    Spacer()

                    Text(format(s.durationSec))
                        .foregroundStyle(Theme.Colors.textDim)
                        .font(.system(.body, design: .monospaced))
                }
                .padding(.vertical, 6)

                Divider().overlay(Theme.Colors.borderHi)
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 20)
        .frame(maxWidth: .infinity)
        .frame(height: 320)
        .background(Theme.Colors.bgElev)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
    }

    private func format(_ sec: Int) -> String {
        let h = sec / 3600
        let m = (sec % 3600) / 60
        let s = sec % 60
        return String(format: "%02d:%02d:%02d", h, m, s)
    }
}