package com.example.spendly;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.example.spendly.LoginActivity;
import com.example.spendly.R;
import com.example.spendly.Utils.Constants;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;

public class AccountFragment extends Fragment {
    private TextView nameTextView;
    private ImageView profileImageView;
    private Button logoutButton;
    private Switch currencySwitch;
    private TextView notificationTextView;

    private boolean isDollarMode = false;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_account, container, false);

        nameTextView = view.findViewById(R.id.nameTextView);
        profileImageView = view.findViewById(R.id.profileImageView);
        logoutButton = view.findViewById(R.id.logoutButton);
        currencySwitch = view.findViewById(R.id.currencySwitch);
        notificationTextView = view.findViewById(R.id.notificationTextView);

        logoutButton.setOnClickListener(v -> logout());
        currencySwitch.setOnCheckedChangeListener((buttonView, isChecked) -> toggleCurrency(isChecked));

        loadUserInfo();
        loadCurrencyMode();
        checkNotifications();

        return view;
    }

    private void loadUserInfo() {
        SharedPreferences prefs = requireContext().getSharedPreferences(Constants.SHARED_PREFS_NAME, Context.MODE_PRIVATE);
        String name = prefs.getString(Constants.KEY_USER_NAME, "");
        String photoUrl = prefs.getString(Constants.KEY_USER_PHOTO_URL, "");

        nameTextView.setText(name);
        if (!TextUtils.isEmpty(photoUrl)) {
            Glide.with(this)
                    .load(photoUrl)
                    .circleCrop()
                    .into(profileImageView);
        }
    }

    private void loadCurrencyMode() {
        SharedPreferences prefs = requireContext().getSharedPreferences(Constants.SHARED_PREFS_NAME, Context.MODE_PRIVATE);
        isDollarMode = prefs.getBoolean(Constants.KEY_CURRENCY_MODE, false);
        currencySwitch.setChecked(isDollarMode);
    }

    private void toggleCurrency(boolean isChecked) {
        isDollarMode = isChecked;
        SharedPreferences prefs = requireContext().getSharedPreferences(Constants.SHARED_PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putBoolean(Constants.KEY_CURRENCY_MODE, isDollarMode);
        editor.apply();
        // Perbarui tampilan dan logika aplikasi sesuai dengan mode mata uang yang dipilih
    }

    private void checkNotifications() {
        // Logika untuk memeriksa notifikasi dan memperbarui tampilan
        boolean hasUnreadNotifications = true; // Ganti dengan logika pemeriksaan notifikasi
        if (hasUnreadNotifications) {
            notificationTextView.setVisibility(View.VISIBLE);
            notificationTextView.setText("New Notifications");
        } else {
            notificationTextView.setVisibility(View.GONE);
        }
    }

    private void logout() {
        GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(requireContext(), GoogleSignInOptions.DEFAULT_SIGN_IN);
        googleSignInClient.signOut()
                .addOnCompleteListener(task -> {
                    // Hapus informasi pengguna dari SharedPreferences
                    SharedPreferences prefs = requireContext().getSharedPreferences(Constants.SHARED_PREFS_NAME, Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = prefs.edit();
                    editor.clear();
                    editor.apply();

                    // Pindahkan ke halaman login
                    Intent intent = new Intent(requireContext(), LoginActivity.class);
                    startActivity(intent);
                    requireActivity().finish();
                });
    }
}