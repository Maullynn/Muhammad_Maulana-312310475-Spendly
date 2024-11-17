package com.example.spendly;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Calendar;

public class Addtransaction extends AppCompatActivity {

    private EditText inputAmount, inputDate, inputNote;
    private Spinner spinnerCategory;
    private Button btnAddTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_transaction);

        // Initialize views
        inputAmount = findViewById(R.id.inputAmount);
        spinnerCategory = findViewById(R.id.spinnerCategory);
        inputDate = findViewById(R.id.inputDate);
        inputNote = findViewById(R.id.inputNote);
        btnAddTransaction = findViewById(R.id.btnAddTransaction);

        // Date picker dialog
        inputDate.setOnClickListener(v -> showDatePicker());

        // Handle Add Transaction button
        btnAddTransaction.setOnClickListener(v -> addTransaction());

        // Bottom navigation listeners
        findViewById(R.id.navBudget).setOnClickListener(v -> navigateToBudget());
        findViewById(R.id.navAdd).setOnClickListener(v -> navigateToAdd());
        findViewById(R.id.navTransactions).setOnClickListener(v -> navigateToTransactions());
        findViewById(R.id.navAccount).setOnClickListener(v -> navigateToAccount());
    }

    private void showDatePicker() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog datePickerDialog = new DatePickerDialog(this,
                (view, year1, month1, dayOfMonth) -> inputDate.setText(dayOfMonth + "/" + (month1 + 1) + "/" + year1),
                year, month, day);
        datePickerDialog.show();
    }

    private void addTransaction() {
        String amount = inputAmount.getText().toString();
        String category = spinnerCategory.getSelectedItem().toString();
        String date = inputDate.getText().toString();
        String note = inputNote.getText().toString();

        // Process the data (e.g., save to database)
        Toast.makeText(this, "Transaction added!", Toast.LENGTH_SHORT).show();
    }

    private void navigateToBudget() {
        // TODO: Implement navigation to Budget screen
    }

    private void navigateToAdd() {
        // TODO: Implement navigation to Add screen
    }

    private void navigateToTransactions() {
        // TODO: Implement navigation to Transactions screen
    }

    private void navigateToAccount() {
        // TODO: Implement navigation to Account screen
    }
}
